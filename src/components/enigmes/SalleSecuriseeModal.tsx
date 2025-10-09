'use client';

import { useState } from 'react';
import FinalCodeModal from './modalsOrdi/FinalCodeModal';
import BaseDeDonneesModal from './modalsOrdi/BaseDeDonneesModal';

// Modal de la salle sécurisée
export default function SalleSecuriseeModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleButtonClick = (action: () => void) => {
    setIsLoading(true);
    setTimeout(() => {
      action();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="relative bg-black overflow-hidden">
      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center justify-center p-8 ">
        <div className="bg-black/80 border-2 border-green-400 rounded-lg p-8 max-w-4xl w-full">
          {/* En-tête du terminal */}
          <div className="border-b border-green-400 pb-4 mb-6">
            <h1 className="text-green-400 font-mono text-2xl text-center">
              TERMINAL SÉCURISÉ
            </h1>
            <p className="text-green-300 font-mono text-sm text-center mt-2">
              Système d'accès restreint - Niveau 3
            </p>
          </div>

          {/* Interface de l'ordinateur */}
          <div className="space-y-6">
            {/* Écran de l'ordinateur */}
            <div className="bg-black border-2 border-green-400 p-6 rounded">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-400 font-mono text-sm ml-4">terminal@secure:~$</span>
              </div>
              
              <div className="space-y-2 text-green-400 font-mono text-sm">
                <div>Bienvenue dans le système sécurisé</div>
                <div>Choisissez une option d'accès :</div>
                <div className="text-green-300 mt-4">
                  [1] Code d'accès final
                  <span className="text-green-500 ml-2">[RESTRICTED]</span>
                </div>
                <div className="text-green-300">
                  [2] Base de données système
                  <span className="text-green-500 ml-2">[RESTRICTED]</span>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedFile("finalCode")}
                className="bg-black border-2 border-green-400 text-green-400 font-mono py-4 px-6 hover:bg-green-400 hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="flex items-center justify-center gap-2">
                    <span className="text-lg">🔐</span>
                    <span>CODE FINAL</span>
                </div>
                <div className="text-xs mt-1 opacity-70">
                  Accès au code de sortie
                </div>
              </button>

              <button
                onClick={() => setSelectedFile("baseDeDonnees")}
                disabled={isLoading}
                className="bg-black border-2 border-green-400 text-green-400 font-mono py-4 px-6 hover:bg-green-400 hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">💾</span>
                  <span>BASE DE DONNÉES</span>
                </div>
                <div className="text-xs mt-1 opacity-70">
                  Accès aux fichiers système
                </div>
              </button>
            </div>

            {/* Indicateur de statut */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-green-400 font-mono text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Système opérationnel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
        {/* Modals */}
        {selectedFile === "finalCode" && <FinalCodeModal onClose={() => setSelectedFile(null)} />}
        {selectedFile === "baseDeDonnees" && <BaseDeDonneesModal onClose={() => setSelectedFile(null)} />}
    </div>
  );
}