interface ModalProps {
  isOpen: boolean;
  content: string;
  onClose: () => void;
}

export default function Modal({ isOpen, content, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-300 rounded-lg shadow-2xl max-w-2xl w-full mx-4 p-6">
        <h3 className="font-bold text-lg mb-4 text-base-content">
          Information
        </h3>
        <div className="whitespace-pre-line text-base-content mb-6">
          {content}
        </div>
        <div className="flex justify-end">
          <button
            className="btn btn-primary"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
