import { Room } from "../RoomsData";

export const createSalleVestiaires = (
  setCurrentRoomIndex: (index: number) => void,
  setChatMessages: (messages: any[]) => void,
  socket: any,
  showModal: (content: string) => void,
  addToInventory: (item: string) => void
): Room => ({
  id: 5,
  name: "Salle Vestiaires",
  imageSrc: "/images/vestiaire.png",
  description:
    "Vestiaires abandonnés. Des blouses de laboratoire tachées traînent sur les bancs.",
  hotspots: [
    {
      id: "blouses",
      x: 73,
      y: 55,
      width: 12,
      height: 35,
      label: "Blouses tachées",
      action: () =>
        showModal(
          "👕 BLOUSES DE LABORATOIRE\n\nBlouse A : Taches bleues (Dr. Smith)\nBlouse B : Taches rouges (Dr. Johnson)\nBlouse C : Taches vertes (Dr. Wilson)\n\nLes couleurs correspondent aux produits chimiques !"
        ),
    },
    {
      id: "casiers",
      x: 64,
      y: 31,
      width: 4,
      height: 20,
      label: "Casiers numérotés",
      action: () => {
        addToInventory("clef trouver dans un casier");
        showModal("Casiers");
      }
    },
  ],
});
