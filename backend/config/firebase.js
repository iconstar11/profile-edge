
const admin = require("firebase-admin");
const serviceAccount = require("../firebase-service-account.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://your-project-id.firebaseio.com" // Replace with your URL
  });
  console.log("✅ Firebase Admin initialized successfully");
} catch (error) {
  console.error("❌ Firebase Admin initialization error:", error);
}

// Get Firestore instance
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

// Export for use in other files
module.exports = { admin, db, FieldValue };

