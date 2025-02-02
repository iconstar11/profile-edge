import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const templates = [
  {
    name: "Modern CV",
    description: "A sleek, professional CV template.",
    format: "PDF",
  },
  {
    name: "Classic CV",
    description: "A traditional CV format with a formal style.",
    format: "Word",
  },
];

const addTemplatesToFirestore = async () => {
  try {
    const templatesRef = collection(db, "cvTemplates");

    for (const template of templates) {
      // Check if the template already exists
      const q = query(templatesRef, where("name", "==", template.name));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Only add the template if it does not exist
        await addDoc(templatesRef, template);
        console.log(`✅ Added template: ${template.name}`);
      } else {
        console.log(`⚠️ Template already exists: ${template.name}`);
      }
    }

    console.log("🔥 Templates check completed.");
  } catch (error) {
    console.error("❌ Error adding templates:", error);
  }
};

// Export the function
export default addTemplatesToFirestore;
