"use client";

import { useState } from "react";

interface DecodeurModalProps {
  onClose: () => void;
}

export default function DecodeurModal({ onClose }: DecodeurModalProps) {
  const [decodeurInput, setDecodeurInput] = useState("");
  const [decodeurResult, setDecodeurResult] = useState("");
  const [decodeurError, setDecodeurError] = useState("");

  const handleDecodeurSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDecodeurError("");
    setDecodeurResult("");
    
    if (decodeurInput === "123") {
      setDecodeurResult("321");
    } else {
      setDecodeurError("Code incorrect. Veuillez réessayer.");
    }
  };

  const handleClose = () => {
    setDecodeurInput("");
    setDecodeurResult("");
    setDecodeurError("");
    onClose();
  };

  return (
    <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="bg-black border-2 border-green-400 rounded-lg p-6 max-w-lg w-full mx-4 font-mono">
        {/* En-tête style terminal */}
        <div className="bg-green-900 text-green-300 px-3 py-2 rounded-t-lg -mt-6 -mx-6 mb-4 border-b border-green-400">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-green-300 font-bold">DECODEUR</span>
          </div>
        </div>
        
        <div className="text-green-400 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-300"></span>
            <span className="animate-pulse">SYSTEM READY</span>
          </div>
          <div className="text-green-500 text-sm mb-4">
            ENTER DECRYPTION CODE:
          </div>
        </div>
        
        <form onSubmit={handleDecodeurSubmit} className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-400"></span>
              <span className="text-green-300">INPUT:</span>
            </div>
            <input
              type="text"
              value={decodeurInput}
              onChange={(e) => setDecodeurInput(e.target.value)}
              className="w-full bg-black text-green-400 border border-green-500 px-3 py-2 font-mono focus:outline-none focus:border-green-300 focus:ring-1 focus:ring-green-300"
              placeholder="ENTER CODE..."
              style={{ caretColor: '#10b981' }}
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-900 text-green-300 border border-green-500 px-4 py-2 font-mono hover:bg-green-800 hover:border-green-300 transition-all duration-200"
          >
            [ EXECUTE DECRYPTION ]
          </button>
        </form>

        {/* Affichage du résultat */}
        {decodeurResult && (
          <div className="mt-4 p-3 bg-green-900/30 border border-green-500 rounded">
            <div className="text-green-300 font-mono">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-400">[✓]</span>
                <span>DECRYPTION SUCCESSFUL</span>
              </div>
              <div className="text-green-400">
                RESULT: <span className="text-green-200 font-bold">{decodeurResult}</span>
              </div>
            </div>
          </div>
        )}

        {/* Affichage de l'erreur */}
        {decodeurError && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-500 rounded">
            <div className="text-red-300 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-red-400">[✗]</span>
                <span>ERROR: {decodeurError}</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-green-500">
          <button 
            className="w-full bg-black text-green-400 border border-green-500 px-4 py-2 font-mono hover:bg-green-900 hover:text-green-200 transition-all duration-200"
            onClick={handleClose}
          >
            [ EXIT SYSTEM ]
          </button>
        </div>
      </div>
    </div>
  );
}
