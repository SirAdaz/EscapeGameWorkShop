import React from 'react';

interface LaboratoireNavigationProps {
  currentRoomIndex: number;
  onToggleView: () => void;

}

export const LaboratoireNavigation: React.FC<LaboratoireNavigationProps> = ({
  currentRoomIndex,
  onToggleView,
}) => {
  // Si on est dans une des salles de laboratoire (niveau 1 ou 2)
  if (currentRoomIndex === 2 || currentRoomIndex === 7) {
    return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <button
          onClick={onToggleView}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-colors"
        >
          ↻ se retourner
        </button>
      </div>
    );
  }

  return null;
};
