const admin = require("firebase-admin");
const serviceAccount = require("./firebase-service-account.json"); // Adjust path as needed

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://console.firebase.google.com/project/profile-edge-e5854/firestore/databases/-default-/data/~2Fusers~2FcOKHzOpg9YY50Pl2owgYLItaPI63" // Replace with your Firebase URL
});

module.exports = admin;