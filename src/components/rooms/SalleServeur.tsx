import { Room } from "../RoomsData";

export const createSalleServeur = (
  setCurrentRoomIndex: (index: number) => void,
  setChatMessages: (messages: any[]) => void,
  socket: any,
  showModal: (content: string) => void,
  addToInventory: (item: string) => void,
  accesAdmin: boolean,
  disjoncteurResolu: boolean
): Room => ({
  id: 2,
  name: "Salle Serveur",
  imageSrc: "/images/serveur.png",
  description:
    "Salle des serveurs informatiques. Des ordinateurs clignotent dans l'obscurité.",
  hotspots: [
    {
      id: "pc",
      x: 44,
      y: 49,
      width: 13,
      height: 20,
      label: "Ordinateur principal",
      action: () => {
        showModal("OrdinateurServeur");
      },
    },
    {
      id: "disjoncteur",
      x: 9,
      y: 29,
      width: 9,
      height: 37,
      label: "Tableau de disjoncteurs",
      action: () => showModal("disjoncteur"),
    },
  ],
});
