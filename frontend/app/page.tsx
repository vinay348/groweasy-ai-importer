"use client";

import { useState } from "react";
import UploadBox from "@/components/UploadBox";
// @ts-ignore: no type declarations for papaparse in this project
import Papa from "papaparse";
// @ts-ignore
import PreviewTable from "@/components/PreviewTable";
import api from "@/services/api";
import ResultTable from "@/components/ResultTable";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<Record<string, string>[]>([]);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);


  const handleImport = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("file", selectedFile);

      const response = await api.post(
        "/import",
        formData
      );

      setParsedData(response.data.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const handleFileSelect = (file: File) => {
    setSelectedFile(file);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete: (results: { data: Record<string, string>[]; }) => {
        setPreviewData(results.data as Record<string, string>[]);
      },

      error: (error: Papa.ParseError) => {
        console.error(error);
      },
    });
  };
  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto px-5">
        <h1 className="text-4xl font-bold text-center mb-10">
          AI CSV Importer
        </h1>

        <UploadBox
          onFileSelect={handleFileSelect}
          selectedFile={selectedFile}
        />
        {selectedFile && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="font-semibold text-green-700">
              ✅ File Uploaded Successfully
            </h3>

            <p className="mt-2">
              {selectedFile.name}
            </p>
          </div>
        )}
        {previewData.length > 0 && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-semibold">
              📊 Total Records
            </h3>

            <p className="text-2xl font-bold mt-2">
              {previewData.length}
            </p>
          </div>
        )}
        <PreviewTable data={previewData} />
        {previewData.length > 0 && (
          <div className="mt-8 flex justify-center">
            <button onClick={handleImport}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl text-lg font-semibold transition"
            >
              {loading ? "Importing..." : "Confirm Import"}
            </button>
          </div>
        )}
        <ResultTable data={parsedData} />
      </div>
    </main>
  );
}