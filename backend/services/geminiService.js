import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing in the .env file");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const callGemini = async (prompt) => {
    try{
  const result = await model.generateContent(prompt);

  const response= result.response
  .text()
  

  return response;
}
catch (error) {
  console.error("Gemini API Error:", error);
  throw new Error("Failed to extract CRM data from Gemini API");
}
}
