'use client';

import Image from 'next/image';
import Hotspot from './Hotspot';

interface HotspotData {
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
  hotspots: HotspotData[];
  onNavigateLeft?: () => void;
  onNavigateRight?: () => void;
  showLeftArrow?: boolean;
  showRightArrow?: boolean;
}

export default function Room({
  imageSrc,
  hotspots,
  onNavigateLeft,
  onNavigateRight,
  showLeftArrow = false,
  showRightArrow = false,
}: RoomProps) {
  return (
    <div className="relative h-screen w-screen overflow-hidden cursor-default">
      {/* Image de fond */}
      <Image
        src={imageSrc}
        alt="Pièce de l'escape game"
        fill
        className="object-cover"
        priority
      />

      {/* Hotspots interactifs */}
      {hotspots.map((hotspot) => (
        <Hotspot
          key={hotspot.id}
          x={hotspot.x}
          y={hotspot.y}
          width={hotspot.width}
          height={hotspot.height}
          onClick={hotspot.action}
          label={hotspot.label}
        />
      ))}

      {/* Flèche de navigation gauche */}
      {showLeftArrow && onNavigateLeft && (
        <button
          onClick={onNavigateLeft}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white text-4xl p-4 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-yellow-300"
          aria-label="Pièce précédente"
        >
          ⬅️
        </button>
      )}

      {/* Flèche de navigation droite */}
      {showRightArrow && onNavigateRight && (
        <button
          onClick={onNavigateRight}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white text-4xl p-4 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-yellow-300"
          aria-label="Pièce suivante"
        >
          ➡️
        </button>
      )}

      {/* Indicateur de pièce (optionnel) */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
        <span className="text-sm font-medium">Escape Game</span>
      </div>
    </div>
  );
}
