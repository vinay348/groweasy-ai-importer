import { parseCSV } from "../services/csvService.js";
import { buildPrompt } from "../services/promptService.js";
import { callGemini } from "../services/geminiService.js";
import fs from "fs";

export const importCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "CSV file is required",
      });
    }

    const records = await parseCSV(req.file.path);
    fs.unlinkSync(req.file.path);

    const prompt = buildPrompt(records);
    let aiResponse = await callGemini(prompt);
    aiResponse = aiResponse.replace(/```json/g, "").replace(/```/g, "").trim();
    const crmRecords = JSON.parse(aiResponse);

    res.status(200).json({
      success: true,
      imported:crmRecords.length,
      records: crmRecords,
    });

  } catch (err) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};