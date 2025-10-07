'use client';

import { useState } from 'react';

interface DisjoncteurPuzzleProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DisjoncteurPuzzle({ isOpen, onClose, onSuccess }: DisjoncteurPuzzleProps) {
  const [buttons, setButtons] = useState([
    [false, false, false],
    [false, false, false]
  ]);

  const toggleButton = (row: number, col: number) => {
    const newButtons = buttons.map((rowButtons, rowIndex) =>
      rowButtons.map((button, colIndex) => {
        // Bouton cliqué
        if (rowIndex === row && colIndex === col) {
          return !button;
        }
        // Boutons adjacents (haut, bas, gauche, droite)
        if (
          (rowIndex === row - 1 && colIndex === col) || // Haut
          (rowIndex === row + 1 && colIndex === col) || // Bas
          (rowIndex === row && colIndex === col - 1) || // Gauche
          (rowIndex === row && colIndex === col + 1)     // Droite
        ) {
          return !button;
        }
        return button;
      })
    );
    setButtons(newButtons);

    // Vérifier si tous les boutons sont allumés
    const allOn = newButtons.every(row => row.every(button => button));
    if (allOn) {
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-base-300">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-warning mb-2">⚡ DISJONCTEUR</h2>
          <p className="text-sm text-base-content/70 mb-4">
            "Ce truc déconne depuis l'explosion"
          </p>
          <div className="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>💡 Cliquez sur un bouton pour inverser celui-ci et ses voisins</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6 justify-items-center">
          {buttons.map((row, rowIndex) =>
            row.map((isOn, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => toggleButton(rowIndex, colIndex)}
                className={`
                  btn w-16 h-16 text-2xl
                  ${isOn 
                    ? 'btn-success shadow-lg' 
                    : 'btn-outline btn-neutral'
                  }
                  hover:scale-105 active:scale-95
                `}
              >
                {isOn ? '💡' : '⚫'}
              </button>
            ))
          )}
        </div>

        <div className="text-center">
          <div className="text-sm text-base-content/60 mb-4">
            Objectif : Allumer tous les boutons
          </div>
          <div className="flex gap-2 justify-center">
            <button
              onClick={onClose}
              className="btn btn-outline"
            >
              Annuler
            </button>
            <button
              onClick={() => {
                setButtons([
                  [false, false, false],
                  [false, false, false]
                ]);
              }}
              className="btn btn-primary"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
