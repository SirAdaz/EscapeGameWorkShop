import { Room } from "../RoomsData";

export const createSalleArchives = (
  setCurrentRoomIndex: (index: number) => void,
  setChatMessages: (messages: any[]) => void,
  socket: any,
  showModal: (content: string) => void,
  addToInventory: (item: string) => void
): Room => ({
  id: 4,
  name: "Salle Archives",
  imageSrc: "/images/archive.png",
  description:
    "Archives poussiéreuses. Des dossiers et des documents anciens sont empilés partout.",
  hotspots: [
    {
      id: "dossier_equation",
      x: 49,
      y: 52,
      width: 6,
      height: 10,
      label: 'Dossier "Équation_C_Succès"',
      action: () =>
        showModal(
          '📁 DOSSIER ÉQUATION\n\nFichier de sauvegarde : "equation_backup.txt"\nAccès via salle serveur\n\nContient les détails de l\'équation réussie !'
        ),
    },
    {
      id: "produits_chimiques",
      x: 73,
      y: 63,
      width: 7,
      height: 8,
      label: 'Dossier "Produits chimiques"',
      action: () =>
        showModal(
          "DOSSIER PRODUITS CHIMIQUES"
        ),
    },
  ],
});
