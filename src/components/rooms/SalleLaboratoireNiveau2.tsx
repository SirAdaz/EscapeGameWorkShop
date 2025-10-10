import { Room } from "../RoomsData";

export const createSalleLaboratoireNiveau2 = (
  setChatMessages: (messages: any[]) => void,
  showModal: (content: string) => void,
  codeLaboObtenu:boolean
): Room => ({
  id: 8,
  name: "Salle Laboratoire - Détail",
  imageSrc: "/images/labo2.png",
  description:
    "Vue détaillée du laboratoire. Des équipements scientifiques abandonnés traînent sur les paillasses.",
  hotspots: [
    {
      id: "tableauNiv2",
      x: 70,
      y: 30,
      width: 28,
      height: 35,
      label: "Tableau d'équations d'élément périodique",
      action: () =>
        showModal(
          'tabNiv2'
        ),
    },
    {
      id: "niveaux",
      x: 47,
      y: 40,
      width: 8,
      height: 30,
      label: "Armoire vérouillée",
      action: () => {
        if (codeLaboObtenu) {
          showModal('jauges_confirmation')
        } else {
          showModal('jauges_equation')
        }
      }
    },
  ],
});
