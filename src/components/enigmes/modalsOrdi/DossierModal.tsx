"use client";

import { useState } from "react";
import RapportModal from "./RapportModal";
import ImageModal from "./ImageModal";
import CodeModal from "./CodeModal";

import FichierVirus from "./fichiersEquations/FichierVirus";
import FichierAmalgam from "./fichiersEquations/FichierAmalgam";
import FichierAlloy from "./fichiersEquations/FichierAlloy";
import FichierNeutralisant from "./fichiersEquations/FichierNeutralisant";
import FichierPenetrant from "./fichiersEquations/FichierPenetrant";

interface DossierModalProps {
  onClose: () => void;
}

export default function DossierModal({ onClose }: DossierModalProps) {

  const fichiers = [
    {
      title : "code.txt",
      file : "code",
    },
    {
      title : "preuve_pour_agent_dentretien.jpg",
      file : "image",
    },
    {
      title : "exp46R.tar",
      file : "virus",
    },
    {
      title : "exp11D.tar",
      file : "amalgam",
    },
    {
      title : "exp18K.tar",
      file : "alloy",
    },
    {
      title : "exp58M.tar",
      file : "neutralisant",
    },
    {
      title : "exp03P.tar",
      file : "penetrant",
    }
  ]

  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  
  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold mb-4 text-gray-800">📁 Dossier Fichiers</h3>
        <div className="space-y-2">
          {
            fichiers.map((fichier,i) => (
              <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"  
                  onClick={() => setSelectedFile(fichier.file)}
                  key={i}
              >
                <span>📄</span>
                <span className="text-black">{fichier.title}</span>
              </div>
            ))
          }
        </div>
        <button 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Fermer
        </button>
      </div>
      {/* Modals */}
      {selectedFile === "code" && <CodeModal onClose={() => setSelectedFile(null)} />}
      {selectedFile === "image" && <ImageModal onClose={() => setSelectedFile(null)} />}

      {selectedFile === "virus" && <FichierVirus onClose={() => setSelectedFile(null)} />}
      {selectedFile === "amalgam" && <FichierAmalgam onClose={() => setSelectedFile(null)} />}
      {selectedFile === "alloy" && <FichierAlloy onClose={() => setSelectedFile(null)} />}
      {selectedFile === "neutralisant" && <FichierNeutralisant onClose={() => setSelectedFile(null)} />}
      {selectedFile === "penetrant" && <FichierPenetrant onClose={() => setSelectedFile(null)} />}
    </div>
  );
}
