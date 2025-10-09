'use client';

import { useState, useEffect } from 'react';

// Modal de la base de données
interface BaseDeDonneesModalProps {
  onClose: () => void;
}

export default function BaseDeDonneesModal({ onClose }: BaseDeDonneesModalProps) {

  const hints = [
    { code: '83576', result: 'Un seul chiffre du nombre 83576 est au bon endroit dans le code final.' },
    { code: 'pairs', result: 'La moitié des chiffres du code sont pairs. 2 sur 4 sont pairs donc 2 pairs et 2 impairs' },
    { code: 'ordre', result: 'Le premier chiffre est plus petit que le second, mais plus grand que le dernier.' },
    { code: 'milieu', result: 'La somme des deux chiffres du milieu est égale à 8.' },
    { code: 'domaine', result: 'Aucun chiffre du code nest supérieur à 8, et aucun ne se répète.' },
    { code: 'structure', result: 'Si tu additionnes les chiffres pairs du code, tu obtiens la moitié de la somme totale.' },
    { code: 'cinq', result: 'Le chiffre 5 est bien présent, mais il nest ni premier, ni dernier.' }
  ];

  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center justify-center p-8">
        <div className="bg-black/80 border-2 border-green-400 rounded-lg p-8 max-w-4xl w-full max-h-[60vh] flex flex-col">
          <h1 className="text-green-400 font-mono text-2xl text-center mb-6">
            BASE DE DONNÉES SYSTÈME
          </h1>

          {/* Contenu scrollable des indices */}
          <div className="flex-1 overflow-y-auto space-y-4">
            <h2 className="text-green-300 font-mono text-lg text-center">
              LOGS DE SÉCURITÉ
            </h2>
            
            <div className="bg-black/50 border border-green-400 rounded p-4 space-y-3">
              {hints.map((hint, index) => (
                <div key={index} className="bg-black/30 border border-green-400/50 rounded p-3">
                  <div className="text-green-300 font-mono text-sm leading-relaxed">
                    {hint.result}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bouton de fermeture - toujours visible */}
          <div className="flex justify-center mt-4">
            <button
              onClick={onClose}
              className="bg-red-600 text-white font-mono py-2 px-6 hover:bg-red-500 transition-colors"
            >
              FERMER
            </button>
          </div>

          {/* Indicateur de statut - toujours visible */}
          <div className="text-center mt-2">
            <div className="inline-flex items-center gap-2 text-green-400 font-mono text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Base de données accessible</span>
            </div>
          </div>
          </div>
        </div>
      </div>
  );
}
