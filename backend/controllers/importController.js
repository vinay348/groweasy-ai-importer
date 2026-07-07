export const importCSV = async (req, res) => {
  try {
    console.log(req.file);

    res.json({
      success: true,
      message: "CSV uploaded successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};