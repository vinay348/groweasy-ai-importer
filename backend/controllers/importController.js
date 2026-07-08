import { parseCSV } from "../services/csvService.js";
import { buildPrompt } from "../services/promptService.js";
import { callGemini } from "../services/geminiService.js";
import { createBatches } from "../utils/batch.js";
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

    const validRecords = records.filter((record) => {
      return (
        Object.values(record).some((value) =>
          value?.toString().includes("@")
        ) ||
        Object.values(record).some((value) =>
          /^\+?\d{10,15}$/.test(value?.toString())
        )
      );
    });

    fs.unlinkSync(req.file.path);

    const batches = createBatches(validRecords);
    let crmRecords = [];

    for (const batch of batches) {
      try {
        const prompt = buildPrompt(batch);
        let aiResponse = await callGemini(prompt);
        aiResponse = aiResponse.replace(/```json/g, "").replace(/```/g, "").trim();
        
        if (!aiResponse) {
          throw new Error("Empty response from Gemini API");
        }

        crmRecords.push(...JSON.parse(aiResponse));
      }
      catch (error) {
        console.error("Error processing batch:", error);
      }
    }
    res.status(200).json({
      success: true,
       totalRecords: records.length,
        processedRecords: validRecords.length,
      imported: crmRecords.length,
      skipped: records.length - validRecords.length,
      records: crmRecords,
    });

  } catch (err) {


    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};