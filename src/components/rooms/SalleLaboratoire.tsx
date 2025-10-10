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
  ],
});
