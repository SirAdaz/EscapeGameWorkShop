import { useState } from "react";

interface AccessCodeProps {
  timeLeft: number;
  onAccessGranted: () => void;
}

export default function AccessCode({
  timeLeft,
  onAccessGranted,
}: AccessCodeProps) {
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [blockedUntil, setBlockedUntil] = useState<Date | undefined>(undefined);

  const handleAccessCode = () => {
    // Vérifier si l'utilisateur est encore bloqué
    if (blockedUntil && new Date() < blockedUntil) {
      const remainingTime = Math.ceil(
        (blockedUntil.getTime() - new Date().getTime()) / 1000
      );
      setAccessError(
        `🔒 Accès bloqué ! Réessayez dans ${remainingTime} secondes.`
      );
      return;
    }

    // Si le blocage est terminé, le réinitialiser
    if (blockedUntil && new Date() >= blockedUntil) {
      setBlockedUntil(undefined);
      setAttempts(0);
    }

    if (accessCode === "1709") {
      onAccessGranted();
    } else {
      setAttempts((prev) => prev + 1);
      if (attempts >= 2) {
        const blockTime = new Date();
        blockTime.setMinutes(blockTime.getMinutes() + 1); // Bloquer pendant 1 minute
        setBlockedUntil(blockTime);
        setAccessError(
          "⚠️ Trop de tentatives ! Accès bloqué pendant 1 minute."
        );
      } else {
        setAccessError(
          `Code d'accès incorrect. Tentatives restantes : ${3 - attempts - 1}`
        );
      }
      setAccessCode("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAccessCode();
    }
  };
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <main className="h-screen w-screen bg-gradient-to-br from-gray-900 via-red-900 to-black flex items-center justify-center">
      <div className="text-center text-white max-w-2xl mx-auto px-8">
        <h1 className="text-6xl font-bold mb-6 text-red-400">TCHERNOBYL2</h1>
        <h2 className="text-2xl mb-8 text-gray-300">
          Accès Restreint - Mission Classifiée
        </h2>

        <div className="bg-black bg-opacity-50 p-8 rounded-lg mb-8">
          <h3 className="text-xl font-bold mb-4 text-yellow-400">
            🔐 ACCÈS SÉCURISÉ
          </h3>

          {/* Timer d'urgence */}
          <div className="bg-red-900 bg-opacity-70 p-4 rounded-lg mb-6 border-l-4 border-red-500">
            <div className="flex items-center justify-center gap-4">
              <div className="text-3xl">⏰</div>
              <div className="text-2xl font-bold text-red-300">
                {formatTime(timeLeft)}
              </div>
            </div>
            <div className="text-center text-red-200 text-sm mt-2">
              ⚠️ TEMPS LIMITÉ - Radioactivité en cours !
            </div>
          </div>

          <p className="text-lg mb-6">
            <strong>2119</strong> - Installation Tchernobyl2
            <br />
            <strong>Classification :</strong> ULTRA SECRET
            <br />
            <strong>Accès :</strong> Personnel autorisé uniquement
          </p>

          <div className="bg-red-900 bg-opacity-50 p-4 rounded border-l-4 border-red-500 mb-6">
            <p className="text-red-200 font-bold">
              ⚠️ ATTENTION : Zone de haute sécurité
            </p>
            <p className="text-red-200 text-sm">
              Radioactivité détectée - Accès limité à 60 minutes
            </p>
          </div>


          {/* Messages d'urgence selon le temps restant */}
          {timeLeft < 300 && (
            <div className="bg-red-800 bg-opacity-70 p-3 rounded border-l-4 border-red-600 mb-4">
              <p className="text-red-300 font-bold animate-pulse">
                🚨 URGENCE ! Moins de 5 minutes avant l'explosion !
              </p>
            </div>
          )}
          {timeLeft < 60 && (
            <div className="bg-red-900 bg-opacity-80 p-3 rounded border-l-4 border-red-700 mb-4">
              <p
                className="text-red-400 font-bold animate-pulse"
                style={{ animationDuration: "0.8s" }}
              >
                💀 CRITIQUE ! Moins d'1 minute !
              </p>
            </div>
          )}
          {timeLeft < 10 && (
            <div className="bg-red-950 bg-opacity-90 p-3 rounded border-l-4 border-red-800 mb-4">
              <p
                className="text-red-500 font-bold animate-pulse"
                style={{ animationDuration: "0.4s" }}
              >
                ⚡ EXPLOSION IMMINENTE !
              </p>
            </div>
          )}
          {timeLeft === 0 && (
            <div className="bg-black bg-opacity-90 p-3 rounded border-l-4 border-red-900 mb-4">
              <p
                className="text-red-600 font-bold animate-pulse"
                style={{ animationDuration: "0.2s" }}
              >
                💥 MISSION ÉCHOUÉE - EXPLOSION !
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Code d'accès requis :
              </label>
              <input
                type="password"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Entrez le code d'accès"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none text-center text-xl tracking-widest"
                maxLength={4}
              />
            </div>

            {accessError && (
              <div className="text-red-400 text-sm animate-pulse">
                ❌ {accessError}
              </div>
            )}

            {attempts > 0 && (
              <div className="text-yellow-400 text-xs">
                🔒 Tentatives : {attempts}/3
              </div>
            )}

              <button
                onClick={handleAccessCode}
              disabled={blockedUntil && new Date() < blockedUntil}
              className={`font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 w-full ${
                blockedUntil && new Date() < blockedUntil
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white hover:scale-105"
              }`}
            >
              {blockedUntil && new Date() < blockedUntil
                ? `🔒 BLOQUÉ (${Math.ceil(
                    (blockedUntil.getTime() - new Date().getTime()) / 1000
                  )}s)`
                : "ACCÉDER À LA MISSION"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
