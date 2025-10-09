import { Room } from "../RoomsData";

export const createSalleSecurisee = (
  setCurrentRoomIndex: (index: number) => void,
  setChatMessages: (messages: any[]) => void,
  socket: any,
  showModal: (content: string) => void,
  setAccesAdmin: (admin: boolean) => void,
  inventory: string[]
): Room => ({
  id: 6,
  name: "Salle Sécurisée",
  imageSrc: "/images/salleSecurise.png",
  description:
    "Salle sécurisée. Un ordinateur est installé avec un code à 4 chiffres.",
  hotspots: [
    {
      id: "ordinateur",
      x: 82,
      y: 48,
      width: 14,
      height: 25,
      label: "Ordinateur",
      action: () => {
        showModal(
          "SalleSecurisee"
        );
        setAccesAdmin(true);
      },
    },
  ],
});
