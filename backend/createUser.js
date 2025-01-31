const functions = require("firebase-functions");
const admin = require("./config");

exports.createUserTokens = functions.auth.user().onCreate(async (user) => {
  try {
    console.log("Creating document for user:", user.uid);
    
    await admin.firestore().collection("users").doc(user.uid).set({
      email: user.email,
      nickname: user.displayName || "Anonymous",
      tokens: 3,
      lastReset: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log("Document created successfully");
    return true;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});