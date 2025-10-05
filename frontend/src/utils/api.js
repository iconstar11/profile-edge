import { getAuth } from "firebase/auth";

const BASE_URL = "https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net";

/** 🔒 Tailor Resume (requires login) */
export async function tailorResume(selectedCV, jobDescription, options) {
  const auth = getAuth();
  const token = await auth.currentUser.getIdToken();

  const response = await fetch(`${BASE_URL}/tailorResume`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ selectedCV, jobDescription, options }),
  });

  if (!response.ok) throw new Error("Tailoring failed");
  const data = await response.json();
  return data.tailoredResume;
}

/** 🌐 Extract Keywords (public) */
export async function extractKeywords(jobDescription) {
  const response = await fetch(`${BASE_URL}/extractKeywords`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jobDescription }),
  });

  if (!response.ok) throw new Error("Keyword extraction failed");
  const data = await response.json();
  return data.keywords;
}
