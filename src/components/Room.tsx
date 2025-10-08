'use client';

import { useState } from 'react';

interface Hotspot {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  action: () => void;
}

interface RoomProps {
  imageSrc: string;
  hotspots: Hotspot[];
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function Room({
  imageSrc,
  hotspots,
  showBackButton = false,
  onBack
}: RoomProps) {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  // Fonction pour convertir les coordonnées en pourcentages responsive
  const convertToResponsive = (hotspot: any) => {
    // Si les coordonnées sont en pixels (grandes valeurs), les convertir en pourcentages
    if (hotspot.x > 100) {
      // Dimensions de référence de l'image originale
      // Ajuste ces valeurs selon les dimensions réelles de ton image Hall.png
      const imageWidth = 1920;  // Largeur originale de l'image (à ajuster)
      const imageHeight = 1080; // Hauteur originale de l'image (à ajuster)
      
      return {
        x: (hotspot.x / imageWidth) * 100,
        y: (hotspot.y / imageHeight) * 100,
        width: (hotspot.width / imageWidth) * 100,
        height: (hotspot.height / imageHeight) * 100
      };
    } else {
      // Déjà en pourcentages
      return {
        x: hotspot.x,
        y: hotspot.y,
        width: hotspot.width,
        height: hotspot.height
      };
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Image de fond */}
      <img 
        src={imageSrc} 
        alt="Room" 
        className="absolute inset-0 w-full h-auto object-cover object-center"
      />
      
      {/* Zones cliquables CSS */}
      {hotspots.map((hotspot) => {
        const responsiveCoords = convertToResponsive(hotspot);
        return (
          <div
            key={hotspot.id}
            className="absolute cursor-crosshair transition-all duration-200"
             style={{
               left: `${responsiveCoords.x}%`,
               top: `${responsiveCoords.y}%`,
               width: `${responsiveCoords.width}%`,
               height: `${responsiveCoords.height}%`,
               zIndex: 5,
               border: '2px solid transparent',
               transition: 'border-color 1s ease-in-out'
             }}
             onMouseEnter={(e) => {
               setHoveredArea(hotspot.id);
               e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
             }}
            onMouseLeave={(e) => {
              setHoveredArea(null);
              e.currentTarget.style.borderColor = 'transparent';
            }}
            onClick={hotspot.action}
          />
        );
      })}

      {/* Bouton de retour en bas au centre */}
      {showBackButton && onBack && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30">
          <button
            onClick={onBack}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2"
          >
            <span>←</span>
            Retour au Hall Principal
          </button>
        </div>
      )}
    </div>
  );
}
