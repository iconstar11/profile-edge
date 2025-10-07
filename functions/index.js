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
  if (req.method !== "POST") {
    return res.status(405).send("Only POST allowed");
  }

  const busboy = Busboy({ headers: req.headers });
  const fields = {};
  const files = [];

  busboy.on("file", (name, file, info) => {
    const { filename, mimeType } = info;
    const buffer = [];
    file.on("data", (data) => buffer.push(data));
    file.on("end", () => {
      files.push({
        filename,
        mimeType,
        buffer: Buffer.concat(buffer),
      });
    });
  });

  busboy.on("field", (name, val) => (fields[name] = val));

  busboy.on("finish", async () => {
    try {
      const { uid } = fields;
      if (!uid) return res.status(400).send("Missing uid");
      if (files.length === 0) return res.status(400).send("No file uploaded");

      const file = files[0];
      const tempPath = saveTempFile(file);
      const text = await extractText(tempPath, file.mimeType);
      deleteTempFile(tempPath);

      // Store text in Firestore
      const resumeRef = await db
        .collection("users")
        .doc(uid)
        .collection("resumes")
        .add({
          fileName: file.filename,
          mimeType: file.mimeType,
          rawText: text,
          createdAt: FieldValue.serverTimestamp(),
        });

      return res.status(200).json({
        message: "✅ Text extracted successfully",
        resumeId: resumeRef.id,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to extract text" });
    }
  });

  req.pipe(busboy);
});

/** ------------------------------------------------------
 *  ✂️ 2. Tailor Resume (AI)
 * ------------------------------------------------------ */
export const tailorResume = onRequest({ region: "us-central1" }, async (req, res) => {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  // const authHeader = req.headers.authorization;
  // (Temporarily skipping auth for testing)
  const uid = "test-user";

  const { selectedCV, jobDescription, options } = req.body;
  if (!selectedCV || !jobDescription) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
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
    console.error("Error tailoring resume:", error);
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
