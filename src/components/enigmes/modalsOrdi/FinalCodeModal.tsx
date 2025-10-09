'use client';

import { useState } from 'react';
import { useSocket } from '@/hooks/useSocket';

// modal du code final

interface FinalCodeModalProps {
    onClose: () => void;
  }

export default function FinalCodeModal({ onClose }: FinalCodeModalProps) {
  const { socket } = useSocket();
  const [code, setCode] = useState(['', '', '', '']);
  const [attempts, setAttempts] = useState<string[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [showPenalty, setShowPenalty] = useState(false);
  
  const correctCode = '8537';

  const handleNumberClick = (num: string) => {
    if (gameWon) return;
    
    const newCode = [...code];
    const emptyIndex = newCode.findIndex(digit => digit === '');
    
    if (emptyIndex !== -1) {
      newCode[emptyIndex] = num;
      setCode(newCode);
    }
  };

  const handleSubmit = () => {
    if (code.some(digit => digit === '')) return;
    
    const currentCode = code.join('');
    setAttempts(prev => [...prev, currentCode]);
    setCurrentAttempt(prev => prev + 1);
    
    if (currentCode === correctCode) {
      setGameWon(true);
    } else {
      // Perdre 1 minute (60 secondes) pour chaque tentative incorrecte
      if (socket) {
        socket.emit('penaltyTime', 60);
        setShowPenalty(true);
        setTimeout(() => setShowPenalty(false), 3000);
      }
      setCode(['', '', '', '']);
    }
  };

  const handleClear = () => {
    setCode(['', '', '', '']);
  };

  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center justify-center p-8">
        {/* Message de pénalité */}
        {showPenalty && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-red-600 text-white font-mono text-lg px-6 py-3 rounded-lg animate-pulse">
            PÉNALITÉ: -1 MINUTE!
          </div>
        )}
        
        <div className="bg-black/80 border-2 border-green-400 rounded-lg p-8 max-w-4xl w-full">
          <h1 className="text-green-400 font-mono text-2xl text-center mb-6">
            TERMINAL SÉCURISÉ
          </h1>
          
          {gameWon ? (
            <div className="text-center">
              <div className="text-green-400 font-mono text-xl mb-4">
                ACCÈS AUTORISÉ
              </div>
              <p className="text-green-300 font-mono">
                Bravo tu as trouvé le code !
              </p>
            </div>
          ) : (
            <>
                <div className="flex flex-col">
                  <p className="text-green-300 font-mono text-sm mb-4 text-center">
                    Entrez le code à 4 chiffres
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
                      disabled={code.some(digit => digit === '')}
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
                      onClick={onClose}
                      className="flex-1 bg-red-600 text-white font-mono py-2 hover:bg-red-500"
                    >
                      FERMER
                    </button>
                  </div>
                </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
