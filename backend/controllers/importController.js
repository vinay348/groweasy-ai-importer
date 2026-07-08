import { parseCSV } from "../services/csvService.js";
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

    res.status(200).json({
      success: true,
      totalRecords: records.length,
      data: records,
    });

  } catch (err) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};