import { Room } from "../RoomsData";

export const createSalleLaboratoire = (
  showModal: (content: string) => void,
  addToInventory: (item: string) => void,
  resolu: boolean
): Room => ({
  id: 3,
  name: "Salle Laboratoire",
  imageSrc: "/images/labo1.png",
  description:
    "Laboratoire de recherche. Des éprouvettes et des rapports scientifiques jonchent les tables.",
  hotspots: [
    {
      id: "chimie",
      x: 45,
      y: 73,
      width: 18,
      height: 20,
      label: "Station de chimie",
      action: () => {
          showModal("Fioles");
      }
    },
      {
          id: "recCle",
          x: 40,
          y: 57,
          width: 5,
          height: 10,
          label: "Indice 4 fiole",
          action: () => {
                 showModal("Indice4Fiole");
          }

      },
    {
      id: "recCle",
      x: 40,
      y: 57,
      width: 5,
      height: 10,
      label: "Station de chimie",
      action: () => {
        addToInventory("Clé du laboratoire");
        showModal("RecupereFioleLabo");
      },
    },
    {
      id: "equation",
      x: 72,
      y: 34,
      width: 28,
      height: 31,
      label: "Tableau d'équations",
      action: () => {
        addToInventory("Code [2]");
        showModal(
          "🧮 ÉQUATION VALIDE\n\nH₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O\n\nValeurs : H=1, S=16, O=8, Na=11\n\n✅ Code partiel trouvé : [2]"
        );
      },
    },
  ],
});
