'use client';

import { useState } from 'react';

interface CasierPuzzleProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CasierPuzzle({ isOpen, onClose, onSuccess }: CasierPuzzleProps) {
  const [selectedNumber, setSelectedNumber] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('');

  // Indice : 2 chiffres pairs, 1 chiffre impair, pas de 4
  // Exemples valides : 268, 682, 826, 286, 628, 862
  const validNumbers = ['268', '682', '826', '286', '628', '862'];

  const checkNumber = () => {
    setAttempts(prev => prev + 1);
    
    if (validNumbers.includes(selectedNumber)) {
      setMessage('✅ CORRECT ! La clé du casier est trouvée !');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } else {
      setMessage('❌ Incorrect. Vérifiez l\'indice : 2 chiffres pairs, 1 chiffre impair, pas de 4');
    }
  };

  const reset = () => {
    setSelectedNumber('');
    setAttempts(0);
    setMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-base-300">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">🔐 CASIERS NUMÉROTÉS</h2>
          <p className="text-sm text-base-content/70 mb-4">
            Trouvez le bon numéro de casier
          </p>
        </div>

        <div className="mb-6">
          <div className="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
            <span>💡 INDICE : "2 chiffres pairs, 1 chiffre impair, pas de 4"</span>
          </div>

          <div className="grid grid-cols-5 gap-2 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
              <button
                key={num}
                onClick={() => setSelectedNumber(prev => prev + num.toString())}
                className="btn btn-outline btn-sm"
                disabled={selectedNumber.length >= 3}
              >
                {num}
              </button>
            ))}
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-2">
              {selectedNumber || '___'}
            </div>
            <div className="text-sm text-base-content/60">
              {selectedNumber.length}/3 chiffres
            </div>
          </div>
        </div>

        {message && (
          <div className={`alert mb-4 ${
            message.includes('✅') 
              ? 'alert-success' 
              : 'alert-error'
          }`}>
            <span>{message}</span>
          </div>
        )}

        <div className="text-center">
          <div className="text-sm text-base-content/60 mb-4">
            Tentatives : {attempts}
          </div>
          <div className="flex gap-2 justify-center">
            <button
              onClick={onClose}
              className="btn btn-outline"
            >
              Annuler
            </button>
            <button
              onClick={reset}
              className="btn btn-secondary"
            >
              Effacer
            </button>
            <button
              onClick={checkNumber}
              disabled={selectedNumber.length !== 3}
              className="btn btn-success"
            >
              Vérifier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
