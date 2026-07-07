"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

type UploadBoxProps = {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
};

export default function UploadBox({ onFileSelect }: UploadBoxProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
    onDrop,
  });

  return (
   
    <div
  {...getRootProps()}
  className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 shadow-sm
    ${
      isDragActive
        ? "border-blue-600 bg-blue-50 scale-[1.02]"
        : "border-gray-300 bg-white hover:border-blue-500 hover:shadow-lg"
    }`}
>
  <input {...getInputProps()} />

  <UploadCloud className="mx-auto h-16 w-16 text-blue-600 mb-4" />

  <h2 className="text-3xl font-bold text-gray-800 mb-2">
    Upload Your CSV File
  </h2>

  <p className="text-gray-500 mb-6">
    Drag & Drop your CSV here or click the button below
  </p>

  <button
    type="button"
    className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg font-medium cursor-pointer"
  >
    Choose File
  </button>

  <p className="mt-6 text-sm text-gray-400">
    Supported format: <span className="font-medium">.csv</span>
  </p>
</div>
  );
}