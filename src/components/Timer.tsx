interface TimerProps {
  timeLeft: number;
}

export default function Timer({ timeLeft }: TimerProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="absolute top-4 left-4 bg-black bg-opacity-80 text-white p-4 rounded-lg">
      <div className="flex items-center gap-4 mb-2">
        <div className="text-2xl">⏰</div>
        <div className="text-xl font-bold text-red-400">
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Messages d'urgence sous le timer */}
      {timeLeft < 300 && timeLeft >= 60 && (
        <div className="text-xs text-red-400 font-bold animate-pulse">
          ⚠️ URGENCE ! Moins de 5 minutes !
        </div>
      )}
      {timeLeft < 60 && timeLeft >= 10 && (
        <div className="text-xs text-red-600 font-bold animate-bounce">
          🚨 CRITIQUE ! Moins d'1 minute !
        </div>
      )}
      {timeLeft < 10 && timeLeft >= 3 && (
        <div className="text-xs text-red-800 font-bold animate-ping">
          💀 DERNIÈRES SECONDES !
        </div>
      )}
      {timeLeft < 3 && timeLeft > 0 && (
        <div className="text-xs text-red-900 font-bold animate-spin">
          ⚡ EXPLOSION IMMINENTE !
        </div>
      )}
      {timeLeft === 0 && (
        <div className="text-xs text-red-950 font-bold animate-pulse">
          💥 MISSION ÉCHOUÉE !
        </div>
      )}
    </div>
  );
}
