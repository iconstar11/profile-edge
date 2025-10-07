import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import fetch from "node-fetch";
import Busboy from "busboy";
import fs from "fs";
import os from "os";
import path from "path";
import mammoth from "mammoth";

// ✅ Fix: dynamically import pdf-parse since it’s CommonJS
let pdf = null;

async function getPdfParser() {
  if (!pdf) {
    const mod = await import("pdf-parse");
    pdf = mod.default || mod;
  }
  return pdf;
}


// Firebase init
initializeApp();
const db = getFirestore();
const auth = getAuth();




/** ------------------------------------------------------
 *  📄 Utility: Save temporary file & delete later
 * ------------------------------------------------------ */
function saveTempFile(file) {
  const tempFilePath = path.join(os.tmpdir(), file.filename);
  fs.writeFileSync(tempFilePath, file.buffer);
  return tempFilePath;
}
function deleteTempFile(filePath) {
  try {
    fs.unlinkSync(filePath);
  } catch (err) {
    console.warn("⚠️ Failed to delete temp file:", err);
  }
}

/** ------------------------------------------------------
 *  📘 extractText(): Read text from PDF or DOCX
 * ------------------------------------------------------ */
async function extractText(filePath, mimeType) {
  try {
    if (mimeType === "application/pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      
      const parser = await getPdfParser();
const data = await parser(dataBuffer);

      return data.text;
    } else if (
      mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
    } else {
      throw new Error("Unsupported file type");
    }
  } catch (error) {
    console.error("❌ Error extracting text:", error);
    throw error;
  }
}

/** ------------------------------------------------------
 *  🧠 1. Upload + Extract CV Text
 * ------------------------------------------------------ */
export const uploadAndExtractCV = onRequest(async (req, res) => {
  console.log('📥 uploadAndExtractCV: Request received', {
    method: req.method,
    headers: req.headers
  });

  if (req.method !== "POST") {
    console.log('❌ uploadAndExtractCV: Method not allowed', { method: req.method });
    return res.status(405).send("Only POST allowed");
  }

  // Fix for Firebase Functions - handle rawBody properly
  return new Promise((resolve, reject) => {
    const busboy = Busboy({ 
      headers: req.headers,
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
      }
    });

    const fields = {};
    const files = [];

    busboy.on("file", (name, file, info) => {
      const { filename, mimeType } = info;
      console.log('📄 uploadAndExtractCV: File detected', { name, filename, mimeType });
      
      const buffer = [];
      file.on("data", (data) => {
        buffer.push(data);
      });
      
      file.on("end", () => {
        console.log('✅ uploadAndExtractCV: File upload complete', {
          filename,
          mimeType,
          totalSize: Buffer.concat(buffer).length
        });
        files.push({
          filename,
          mimeType,
          buffer: Buffer.concat(buffer),
        });
      });
    });

    busboy.on("field", (name, val) => {
      console.log('🔤 uploadAndExtractCV: Field received', { name, val });
      fields[name] = val;
    });

    busboy.on("finish", async () => {
      console.log('🎉 uploadAndExtractCV: Busboy finish event triggered');
      
      try {
        const { uid } = fields;
        console.log('👤 uploadAndExtractCV: Processing fields', { fields, uid });

        if (!uid) {
          console.log('❌ uploadAndExtractCV: Missing uid field');
          res.status(400).send("Missing uid");
          return resolve();
        }
        
        if (files.length === 0) {
          console.log('❌ uploadAndExtractCV: No files uploaded');
          res.status(400).send("No file uploaded");
          return resolve();
        }

        const file = files[0];
        console.log('💾 uploadAndExtractCV: Processing file', {
          filename: file.filename,
          mimeType: file.mimeType,
          bufferSize: file.buffer.length
        });

        console.log('📝 uploadAndExtractCV: Saving temporary file');
        const tempPath = saveTempFile(file);
        console.log('📄 uploadAndExtractCV: Temporary file saved', { tempPath });

        console.log('🔍 uploadAndExtractCV: Extracting text from file');
        const text = await extractText(tempPath, file.mimeType);
        console.log('✅ uploadAndExtractCV: Text extraction complete', {
          textLength: text.length,
          textPreview: text.substring(0, 100) + '...'
        });

        console.log('🧹 uploadAndExtractCV: Deleting temporary file');
        deleteTempFile(tempPath);

        // Store text in Firestore
        console.log('🔥 uploadAndExtractCV: Storing in Firestore', { uid });
        const resumeRef = await db
          .collection("users")
          .doc(uid)
          .collection("resumes")
          .add({
            fileName: file.filename,
            mimeType: file.mimeType,
            rawText: text,
            createdAt: FieldValue.serverTimestamp(),
            version: await getNextVersion(uid)
          });

        // Add this helper function
        async function getNextVersion(uid) {
  const resumesSnapshot = await db
    .collection("users")
    .doc(uid)
    .collection("resumes")
    .orderBy("createdAt", "asc")
    .get();

  // Generate current date in YYYY-MM-DD format
  const now = new Date();
  const date = now.toISOString().split("T")[0]; // e.g. "2025-10-07"

  if (resumesSnapshot.empty) {
    return `CV_${date}_V1`; // first version
  }

  // Count existing resumes to determine next version number
  const resumeCount = resumesSnapshot.size + 1; // +1 for the new one
  return `CV_${date}_V${resumeCount}`;
}

        console.log('✅ uploadAndExtractCV: Firestore document created', {
          resumeId: resumeRef.id
        });

        res.status(200).json({
          message: "✅ Text extracted successfully",
          resumeId: resumeRef.id,
        });
        resolve();
      } catch (error) {
        console.error('❌ uploadAndExtractCV: Error occurred', {
          error: error.message,
          stack: error.stack,
          fields,
          filesCount: files.length
        });
        res.status(500).json({ error: "Failed to extract text" });
        resolve();
      }
    });

    busboy.on("error", (error) => {
      console.error('❌ uploadAndExtractCV: Busboy error', {
        error: error.message,
        stack: error.stack
      });
      res.status(500).json({ error: "File upload failed" });
      resolve();
    });

    console.log('🚀 uploadAndExtractCV: Starting request pipe to busboy');
    
    // Use rawBody if available (Firebase Functions v2)
    if (req.rawBody) {
      console.log('🔧 uploadAndExtractCV: Using rawBody');
      busboy.end(req.rawBody);
    } else {
      req.pipe(busboy);
    }
  });
});

/** ------------------------------------------------------
 *  📄 2. Get User CVs
 * ------------------------------------------------------ */
export const getUserCVs = onRequest(async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).send("Only GET allowed");
  }

  try {
    const { uid } = req.query;
    
    if (!uid) {
      return res.status(400).send("Missing uid parameter");
    }

    console.log('📋 getUserCVs: Fetching CVs for user', { uid });

    const resumesSnapshot = await db
      .collection("users")
      .doc(uid)
      .collection("resumes")
      .orderBy("createdAt", "desc")
      .get();

    const resumes = [];
    resumesSnapshot.forEach(doc => {
      const data = doc.data();
      resumes.push({
        id: doc.id,
        fileName: data.fileName,
        mimeType: data.mimeType,
        rawText: data.rawText,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        // You can add text preview here
        textPreview: data.rawText?.substring(0, 200) + '...'
      });
    });

    console.log('✅ getUserCVs: Found resumes', { count: resumes.length });

    return res.status(200).json({
      resumes,
      count: resumes.length
    });

  } catch (error) {
    console.error('❌ getUserCVs: Error occurred', {
      error: error.message,
      stack: error.stack
    });
    return res.status(500).json({ error: "Failed to fetch CVs" });
  }
});


/** ------------------------------------------------------
 *  ✂️ 2. Tailor Resume (AI)
 * ------------------------------------------------------ */
export const tailorResume = onRequest({ region: "us-central1" }, async (req, res) => {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  try {
    // ✅ Verify Firebase Auth token (works with frontend Authorization: Bearer <token>)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid authorization header" });
    }

    const idToken = authHeader.split("Bearer ")[1];
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // ✅ Parse Request Body
    const { selectedCV, jobDescription, options } = req.body;
    if (!selectedCV || !jobDescription) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ✅ Construct Prompt
    const prompt = `
You are an expert career assistant.
Tailor the following resume for the provided job description.
Focus on keywords and ATS optimization if requested.
Tone: ${options?.tone || "professional"}.

--- JOB DESCRIPTION ---
${jobDescription}

--- USER RESUME ---
${selectedCV}

Return ONLY the tailored resume text.
    `;

    // ✅ Call DeepSeek API
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const tailoredText = data?.choices?.[0]?.message?.content || "";

    // ✅ Save to Firestore under authenticated user
    const versionName = selectedCV.title || "Untitled Resume";
    await db
      .collection("users")
      .doc(uid)
      .collection("tailoredResumes")
      .doc(versionName)
      .set({
        tailoredText,
        createdAt: FieldValue.serverTimestamp(),
        atsScore: null,
      });

    return res.status(200).json({ tailoredResume: tailoredText });
  } catch (error) {
    console.error("❌ Error tailoring resume:", error);
    return res.status(500).json({ error: "Failed to tailor resume" });
  }
});


  
/** ------------------------------------------------------
 *  🔍 3. Extract Keywords
 * ------------------------------------------------------ */
export const extractKeywords = onRequest({ region: "us-central1" }, async (req, res) => {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { jobDescription } = req.body;
  if (!jobDescription) return res.status(400).json({ error: "Missing job description" });

  try {
    const prompt = `
Extract the top 10 most important keywords and skills from this job description.
Return them as a simple comma-separated list.

${jobDescription}
    `;

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    const keywords = data?.choices?.[0]?.message?.content || "";
    return res.status(200).json({ keywords });
  } catch (error) {
    console.error("Error extracting keywords:", error);
    return res.status(500).json({ error: "Keyword extraction failed" });
  }
});