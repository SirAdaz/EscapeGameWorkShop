'use client';

interface HotspotProps {
  x: number; // Position X en pourcentage (0-100)
  y: number; // Position Y en pourcentage (0-100)
  width: number; // Largeur en pourcentage
  height: number; // Hauteur en pourcentage
  onClick: () => void;
  label?: string; // Label optionnel pour l'accessibilité
  className?: string; // Classes CSS supplémentaires
}

export default function Hotspot({
  x,
  y,
  width,
  height,
  onClick,
  label,
  className = ''
}: HotspotProps) {
  return (
    <button
      onClick={onClick}
      className={`
        absolute
        rounded-full
        border-0
        border-transparent
        hover:border-yellow-400
        hover:ring-0
        hover:ring-yellow-400
        hover:ring-opacity-5
        transition-all
        duration-1000
        delay-200
        focus:outline-none
        focus:ring-1
        focus:ring-yellow-400
        focus:ring-opacity-20
        opacity-0
        hover:opacity-100
        hover:bg-yellow-400
        hover:bg-opacity-3
        hover:cursor-pointer
        cursor-default
        hover:z-10
        hover:brightness-110
        hover:contrast-110
        hover:animate-pulse
        hover:scale-110
        hover:shadow-sm
        hover:shadow-yellow-400
        hover:shadow-opacity-1
        ${className}
      `}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
      }}
      aria-label={label || 'Zone interactive'}
      title={label}
    />
  );
}
