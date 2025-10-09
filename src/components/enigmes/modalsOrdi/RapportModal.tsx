"use client";

interface RapportModalProps {
  onClose: () => void;
}

export default function RapportModal({ onClose }: RapportModalProps) {
  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4 text-gray-800">📄 Rapport.pdf</h3>
        <div className="space-y-4 text-gray-700">
          <p><strong>Rapport de Sécurité - Serveur Principal</strong></p>
          <p>Date: {new Date().toLocaleDateString()}</p>
          <hr />
          <p>Ce rapport contient des informations sensibles sur la configuration du serveur principal.</p>
          <p><strong>ATTENTION:</strong> Ce document est classifié et ne doit pas être partagé.</p>
          <div className="bg-yellow-100 p-3 rounded border-l-4 border-yellow-500">
            <p className="text-yellow-800"><strong>Note:</strong> Les codes d'accès sont stockés dans un fichier séparé.</p>
          </div>
        </div>
        <button 
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={onClose}
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
