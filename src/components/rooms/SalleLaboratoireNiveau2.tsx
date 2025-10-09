import { Room } from "../RoomsData";

export const createSalleLaboratoireNiveau2 = (
  setChatMessages: (messages: any[]) => void,
  showModal: (content: string) => void,
): Room => ({
  id: 8,
  name: "Salle Laboratoire - Détail",
  imageSrc: "/images/labo2.png",
  description:
    "Vue détaillée du laboratoire. Des équipements scientifiques abandonnés traînent sur les paillasses.",
  hotspots: [
    {
      id: "rapports",
      x: 63,
      y: 62,
      width: 5,
      height: 8,
      label: "Pile de rapports",
      action: () =>
        showModal(
          '📋 RAPPORTS DE RECHERCHE\n\nÉquations testées :\n- Équation A : ÉCHEC\n- Équation B : ÉCHEC\n- Équation C : SUCCÈS ✅\n\nDossier correspondant : "Équation_C_Succès"'
        ),
    },
  ],
});
