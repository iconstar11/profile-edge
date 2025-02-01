const OpenAI = require("openai");
require("dotenv").config(); // Load environment variables from .env file

const openai = new OpenAI({
    baseURL: "https://api.deepseek.com", // DeepSeek API endpoint
    apiKey: process.env.DEEPSEEK_API_KEY, // Use the API key from .env
});

const sendToDeepSeek = async (extractedText) => {
    try {
        console.log("Sending request to DeepSeek API...");
        console.log("Using API Key:", process.env.DEEPSEEK_API_KEY ? "***" : "Not Found");

        const completion = await openai.chat.completions.create({
            model: "deepseek-chat", // Correct model name
            messages: [
                {
                    role: "system",
                    content: "You are an ATS-optimization specialist. Restructure this raw text into a professional CV using: -Reverse-chronological format - 3-5 bullet points per position- Industry-specific action verbs - Section headers: Summary, Experience, Education, Skills- No first-person pronouns"
                },
                {
                    role: "user",
                    content: extractedText,
                },
            ],
            temperature: 0.7, // Adjust the creativity level as needed
        });

        console.log("DeepSeek API Response:", completion);
        return completion.choices[0].message.content; // Return the DeepSeek response text
    } catch (error) {
        console.error("Error calling DeepSeek API:");
        console.error("Error:", error);

        if (error.message.includes("Model Not Exist")) {
            throw new Error("The specified model does not exist. Please check the model name in the DeepSeek API documentation.");
        } else {
            throw new Error("Failed to process text with DeepSeek.");
        }
    }
};

module.exports = sendToDeepSeek;