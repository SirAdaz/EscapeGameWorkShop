"use client";

import { useState } from "react";
import DossierModal from "./modalsOrdi/DossierModal";
import RapportModal from "./modalsOrdi/RapportModal";
import DecodeurModal from "./modalsOrdi/DecodeurModal";

// page du terminal de la salle serveur

export default function OrdinateurServerModal() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  return (
    <div className="w-[600px] h-[450px] bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative overflow-hidden rounded-lg">
      {/* Fond d'écran avec motif */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-cyan-400/10 to-blue-600/10"></div>
        <div className="absolute top-8 left-8 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-16 right-16 w-20 h-20 bg-cyan-300/10 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-blue-400/10 rounded-full blur-md"></div>
      </div>

      {/* Icônes du bureau */}
      <div className="absolute top-6 left-6 flex flex-col gap-4">

        {/* Dossier 1 */}
        <div className="flex flex-col items-center cursor-pointer hover:bg-white/10 p-2 rounded transition-colors" onClick={() => setSelectedFile("dossier")}>
          <div className="relative">
            {/* Corps du dossier */}
            <div className="w-14 h-12 bg-yellow-400 rounded-sm shadow-lg border border-yellow-500">
              {/* Onglet du dossier */}
              <div className="absolute -top-1 left-1 w-8 h-3 bg-yellow-500 rounded-t-sm"></div>
              {/* Contenu du dossier - lignes représentant des fichiers */}
              <div className="p-1">
                <div className="w-full h-1 bg-yellow-200 rounded mb-1"></div>
                <div className="w-3/4 h-1 bg-yellow-200 rounded mb-1"></div>
                <div className="w-1/2 h-1 bg-yellow-200 rounded"></div>
              </div>
            </div>
          </div>
          <span className="text-white text-xs mt-1 text-center max-w-16">Fichiers</span>
        </div>

        {/* Fichier 2 */}
        <div className="flex flex-col items-center cursor-pointer hover:bg-white/10 p-2 rounded transition-colors" onClick={() => setSelectedFile("rapport")}>
          <div className="w-12 h-16 bg-white rounded-sm shadow-lg flex items-center justify-center">
            <div className="w-8 h-10 bg-green-500 rounded-sm"></div>
          </div>
          <span className="text-white text-xs mt-1 text-center max-w-16">Rapport.pdf</span>
        </div>

        {/* Fichier 3 */}
        <div className="flex flex-col items-center cursor-pointer hover:bg-white/10 p-2 rounded transition-colors" onClick={() => setSelectedFile("decodeur")}>
          <div className="w-12 h-16 bg-white rounded-sm shadow-lg flex items-center justify-center">
            <div className="w-8 h-10 bg-red-500 rounded-sm"></div>
          </div>
          <span className="text-white text-xs mt-1 text-center max-w-16">décodeur</span>
        </div>
      </div>

      {/* Corbeille */}
      <div className="absolute top-4 right-6 flex flex-col items-center cursor-pointer hover:bg-white/10 p-2 rounded transition-colors">
        <div className="w-12 h-12 bg-gray-600 rounded-lg shadow-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-gray-400 rounded-sm"></div>
        </div>
        <span className="text-white text-xs mt-1">Corbeille</span>
      </div>

      {/* Barre des tâches en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/30 backdrop-blur-sm border-t border-white/20 flex items-center px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">W</span>
          </div>
          <div className="text-white text-sm">Terminal</div>
        </div>
        <div className="ml-auto text-white text-sm">
          {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Modals */}
      {selectedFile === "dossier" && <DossierModal onClose={() => setSelectedFile(null)} />}
      {selectedFile === "rapport" && <RapportModal onClose={() => setSelectedFile(null)} />}
      {selectedFile === "decodeur" && <DecodeurModal onClose={() => setSelectedFile(null)} />}
    </div>
  );
}
