// modal pour l'image schema

interface ImageModalProps {
    onClose: () => void;
  }
export default function ImageModal({ onClose }: ImageModalProps) {
  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold mb-4 text-gray-800">📄 Image Schema</h3>
        <img src="/images/vestiaire.png" alt="Image Schema" className="w-full h-auto" />
      </div>
      <button 
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={onClose}
      >
        Fermer
      </button>
    </div>
  );
}