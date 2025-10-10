// page de l'enigme des casiers
import { useGameState } from "../../hooks/useGameState";

export default function Casiers() {
  const { 
    casiersResolu, 
    casiersProgress, 
    currentCasierNumber 
  } = useGameState();

  if (casiersResolu) {
    return (
      <div className="text-center p-6">
        <h1 className="text-2xl font-bold text-green-600 mb-4">🎉 Félicitations !</h1>
        <p className="text-lg mb-4">Vous avez trouvé la clef !</p>
        <p className="text-sm text-gray-600">La séquence des casiers a été résolue avec succès.</p>
      </div>
    );
  }

  return (
    <div className="text-center p-6">
      <h1 className="text-2xl font-bold mb-4">Casier {currentCasierNumber}</h1>
      <div className="mb-4">
        <p className="text-lg mb-2">Casier vide</p>
        <p className="text-sm text-gray-600">
          Progrès: {casiersProgress.current}/{casiersProgress.total}
        </p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(casiersProgress.current / casiersProgress.total) * 100}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-500">
        Trouvez le bon casier pour continuer la séquence...
      </p>
    </div>
  );
}
