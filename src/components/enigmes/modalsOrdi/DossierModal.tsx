"use client";

import { useState } from "react";
import RapportModal from "./RapportModal";
import ImageModal from "./ImageModal";
import CodeModal from "./CodeModal";

interface DossierModalProps {
  onClose: () => void;
}

export default function DossierModal({ onClose }: DossierModalProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold mb-4 text-gray-800">📁 Dossier Fichiers</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"  onClick={() => setSelectedFile("rapport")}>
            <span>📄</span>
            <span className="text-black">rapport.txt</span>
          </div>
          <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"  onClick={() => setSelectedFile("code")}>
            <span>📄</span>
            <span className="text-black">code.txt</span>
          </div>
          <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"  onClick={() => setSelectedFile("image_schema")}>
            <span>📄</span>
            <span className="text-black">image_schema.txt</span>
          </div>
        </div>
        <button 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Fermer
        </button>
      </div>
      {/* Modals */}
      {selectedFile === "rapport" && <RapportModal onClose={() => setSelectedFile(null)} />}
      {selectedFile === "code" && <CodeModal onClose={() => setSelectedFile(null)} />}
      {selectedFile === "image_schema" && <ImageModal onClose={() => setSelectedFile(null)} />}
    </div>
  );
}
