import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import fetch from "node-fetch";

initializeApp();
const db = getFirestore();
const auth = getAuth();

/**
 * 🔐 Secure AI Tailoring Endpoint
 * Requires Firebase Auth token in headers
 */
export const tailorResume = onRequest({ region: "us-central1" }, async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  // 🔐 Verify Firebase Auth
  /** const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split("Bearer ")[1];
  let decodedToken;

  try {
    decodedToken = await auth.verifyIdToken(idToken);
  } catch (err) {
    console.error("Auth verification failed:", err);
    return res.status(403).json({ error: "Invalid token" });
  }

  const uid = decodedToken.uid; **/

   const uid = 'test-user';

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

/**
 * 🌐 Public Keyword Extractor
 * Anyone can call this — no auth needed
 */
export const extractKeywords = onRequest({ region: "us-central1" }, async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { jobDescription } = req.body;
  if (!jobDescription) {
    return res.status(400).json({ error: "Missing job description" });
  }

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
