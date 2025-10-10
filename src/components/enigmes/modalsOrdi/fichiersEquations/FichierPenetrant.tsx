import FichierProps from "./FichierProps";

export default function FichierVirus({onClose} : FichierProps) {
    return (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                <h3 className="text-xl font-bold mb-4 text-gray-800">exp03P.tar</h3>
                <div className="space-y-4 text-gray-700">
                    <p><strong>Fichier de sauvegarde - Valeurs de molécules pour équation</strong></p>
                    <hr />
                    <h2>Get StickBugged Nerd</h2>
                </div>
                <button 
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={onClose}>Fermer</button>
            </div>
        </div>
    )
}