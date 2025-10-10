"use client";
import { useState } from "react";
import { useGameState } from "@/hooks/useGameState";
import { useSocket } from "@/hooks/useSocket";

// Modal pour saisir le code de la porte sécurisée
export default function PorteSecuriseeModal() {
   const [code, setCode] = useState(["", "", "", "", ""]);
   const [error, setError] = useState("");
   const { setCodeGeneralObtenu, setModalOpen, setCurrentRoomIndex } = useGameState();
   const { socket } = useSocket();

  const correctCode = "87653";

  const handleNumberClick = (num: string) => {
    const newCode = [...code];
    const emptyIndex = newCode.findIndex((digit) => digit === "");

    if (emptyIndex !== -1) {
      newCode[emptyIndex] = num;
      setCode(newCode);
    }
  };

   const handleSubmit = () => {
     if (code.some((digit) => digit === "")) return;

     const currentCode = code.join("");

     if (currentCode === correctCode) {
       setCodeGeneralObtenu(true);
       

       // Notifier les autres joueurs via socket
       if (socket) {
        socket.emit("setCodeGeneralObtenu", true );
        socket.emit("playerMove", { room: "Salle Sécurisée" });
       }
       
       setCurrentRoomIndex(5);
       setModalOpen(false);
     } else {
       setError("Code incorrect. Essayez encore.");
       setCode(["", "", "", "", ""]);
     }
   };

  const handleClear = () => {
    setCode(["", "", "", "", ""]);
    setError("");
  };

  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="relative z-10 flex flex-col items-center justify-center p-8">
        <div className="bg-black/80 border-2 border-green-400 rounded-lg p-8 max-w-4xl w-full">
          <h1 className="text-green-400 font-mono text-2xl text-center mb-6">
            TERMINAL D'ACCÈS SÉCURISÉ
          </h1>
          <div className="flex flex-col">
            <p className="text-green-300 font-mono text-sm mb-4 text-center">
              Entrez le code à 5 chiffres pour débloquer l'accès
            </p>
            <p className="text-green-300 font-mono text-sm mb-4 text-center">
              Le secret se cache dans la descente des nombres : du sommet jusqu’à la base.
            </p>

            {/* Affichage du code actuel */}
            <div className="flex justify-center gap-2 mb-6">
              {code.map((digit, index) => (
                <div
                  key={index}
                  className="w-12 h-12 border-2 border-green-400 bg-black text-green-400 font-mono text-xl flex items-center justify-center"
                >
                  {digit}
                </div>
              ))}
            </div>

            {/* Message d'erreur */}
            {error && (
              <p className="text-red-400 font-mono text-sm mb-4 text-center">
                {error}
              </p>
            )}

            {/* Clavier numérique */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberClick(num.toString())}
                  className="bg-black border border-green-400 text-green-400 font-mono text-lg py-2 hover:bg-green-400 hover:text-black transition-colors"
                >
                  {num}
                </button>
              ))}
            </div>

            {/* Boutons d'action */}
            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                disabled={code.some((digit) => digit === "")}
                className="flex-1 bg-green-400 text-black font-mono py-2 hover:bg-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                VALIDER
              </button>
              <button
                onClick={handleClear}
                className="flex-1 bg-red-600 text-white font-mono py-2 hover:bg-red-500"
              >
                EFFACER
              </button>
               <button
                 onClick={() => setModalOpen(false)}
                 className="flex-1 bg-red-600 text-white font-mono py-2 hover:bg-red-500"
               >
                 FERMER
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
