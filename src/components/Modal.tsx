import CasiersModal from './enigmes/CasiersModal';
import ProduitsChimiquesRapportModal from './enigmes/ProduitsChimiquesRapportModal';
import OrdinateurServerModal from './enigmes/OrdinateurServerModal';
import DisjoncteurModal from './rooms/DisjoncteurModal';

interface ModalProps {
  isOpen: boolean;
  content: string;
  onClose: () => void;
}

export default function Modal({ isOpen, content, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-base-300 bg-black rounded-lg shadow-2xl max-w-2xl w-full mx-4 p-6">
        <div className="whitespace-pre-line text-base-content mb-6">
          {
            content === "disjoncteur" && <DisjoncteurModal/> 
          }
          {
            content === "DOSSIER PRODUITS CHIMIQUES" && <ProduitsChimiquesRapportModal />
          }
          {
            content === "Casiers" && <CasiersModal />
          }
          {
            content === "OrdinateurServerModal" && <OrdinateurServerModal />
          }
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
