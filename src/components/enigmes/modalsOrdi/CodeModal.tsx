// modal pour le code

interface CodeModalProps {
    onClose: () => void;
  }
export default function CodeModal({ onClose }: CodeModalProps) {
  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold mb-4 text-gray-800">📄 Code</h3>
        <p className="text-black">Le code est : 123</p>
        <button 
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={onClose}
            >
                Fermer
            </button>
        </div>
    </div>
  );
}