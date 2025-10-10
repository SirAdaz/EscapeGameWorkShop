import CasiersModal from './enigmes/CasiersModal';
import ProduitsChimiquesRapportModal from './enigmes/ProduitsChimiquesRapportModal';
import OrdinateurServerModal from './enigmes/OrdinateurServerModal';
import SalleSecuriseeModal from './enigmes/SalleSecuriseeModal';
import DisjoncteurModal from './rooms/DisjoncteurModal';
import Fiole from "@/components/Fiole";
import JaugesModal from './enigmes/modalsLabo/JaugesModal';
import EquationRapportModal from './enigmes/EquationRapportModal';
import TableauEqModal from './rooms/TableauEqModal';
import ImprimanteModal from './enigmes/modalsArchive/ImprimanteModal';
import Indice4Fiole from "@/components/enigmes/Indice4Fiole";
import FauxCasierModal from './enigmes/FauxCasierModal';
import PorteSecuriseeModal from './enigmes/PorteSecuriseeModal';

interface ModalProps {
  isOpen: boolean;
  content: string;
  onClose: () => void;
  onVictory?: () => void;
}

export default function Modal({ isOpen, content, onClose, onVictory }: ModalProps) {
  if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-black rounded-lg shadow-2xl max-w-2xl w-full mx-4 p-6">
                <div className="whitespace-pre-line text-base-content mb-6">
                    {
                        content === "disjoncteur" && <DisjoncteurModal/>
                    }
                    {
                        content === "DOSSIER PRODUITS CHIMIQUES" && <ProduitsChimiquesRapportModal />
                    }
                    {
                        content === "DOSSIER EQUATION" && <EquationRapportModal/>
                    }
                    {
                        content === "archive_feuille_code" && <ImprimanteModal/>
                    }
                    {
                        content === "Casiers" && <CasiersModal />
                    }
                    {
                        content === "OrdinateurServeur" && <OrdinateurServerModal />
                    }
                    {
                      content === "SalleSecurisee" && <SalleSecuriseeModal onVictory={onVictory} />
                    }
                    {
                      content === "jauges_equation" && <JaugesModal/>
                    }
                    {
                        content === "tabNiv2" && <TableauEqModal/>
                    }
                    {
                        content === "Fioles" && <Fiole onClose={onClose}/>
                    }
                    {
                        content === "Indice4Fiole" && <Indice4Fiole onRetour={onClose}/>
                    }
                    {
                        content === "PorteSecuriseeModal" && <PorteSecuriseeModal/>
                    }
                    {
                        content === "FauxCasier" && <FauxCasierModal/>
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