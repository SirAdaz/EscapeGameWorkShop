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
      x: 25,
      y: 40,
      width: 20,
      height: 15,
      label: 'Dossier "Équation_C_Succès"',
      action: () =>
        showModal(
          '📁 DOSSIER ÉQUATION\n\nFichier de sauvegarde : "equation_backup.txt"\nAccès via salle serveur\n\nContient les détails de l\'équation réussie !'
        ),
    },
    {
      id: "produits_chimiques",
      x: 60,
      y: 35,
      width: 18,
      height: 20,
      label: 'Dossier "Produits chimiques"',
      action: () =>
        showModal(
          "🧪 DOSSIER PRODUITS CHIMIQUES\n\nProduits listés :\n- Acide sulfurique (corrosif)\n- Hydroxyde de sodium (piquant)\n- Eau distillée (inodore)\n\nParticipants : Dr. Smith, Dr. Johnson"
        ),
    },
    {
      id: "archives",
      x: 45,
      y: 65,
      width: 15,
      height: 12,
      label: "Archives générales",
      action: () => {
        addToInventory("Code [3]");
        showModal(
          "📚 ARCHIVES GÉNÉRALES\n\nDocuments de recherche\nRapports d'expériences\n\n✅ Code partiel trouvé : [3]"
        );
      },
    },
  ],
});
