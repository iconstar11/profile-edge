const axios = require("axios");
require("dotenv").config(); // Load environment variables from .env file

const sendToDeepSeek = async (extractedText) => {
    try {
        const response = await axios.post(
            "https://api.deepseek.com/v1/chat/completions", // Replace with the actual DeepSeek API endpoint
            {
                model: "deepseek-v3", // Replace with the appropriate DeepSeek model
                messages: [
                    {
                        role: "system",
                        content: "You are a professional resume assistant. Please create a polished CV using the provided text.",
                    },
                    {
                        role: "user",
                        content: extractedText,
                    },
                ],
                temperature: 0.7, // Adjust the creativity level as needed
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`, // Use the API key from .env
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data.choices[0].message.content; // Return the DeepSeek response text
    } catch (error) {
        console.error("Error calling DeepSeek API:", error.response?.data || error.message);
        throw new Error("Failed to process text with DeepSeek.");
    }
};

module.exports = sendToDeepSeek;