import { useGameState } from "@/hooks/useGameState";
import { Room } from "../RoomsData";

export const createHallPrincipal = (

  setCurrentRoomIndex: (index: number) => void,
  setChatMessages: (messages: any[]) => void,
  socket: any,
  disjoncteurResolu:boolean
): Room => ({
  id: 1,
  name: "Entrée - Hall Principal",
  imageSrc: "/images/Hall.png",
  description:
    "Hall d'entrée de l'usine abandonnée. Des combinaisons de protection traînent au sol.",
  hotspots: [
    {
      id: "porte_serveur",
      x: 85,
      y: 30,
      width: 10,
      height: 55,
      label: "Porte vers Salle Serveur",
      action: () => {
        setCurrentRoomIndex(1);
        setChatMessages([]);
        if (socket) {
          socket.emit("playerMove", { room: "Salle Serveur" });
        }
      },
    },
    {
      id: "porte_laboratoire",
      x: 6,
      y: 33,
      width: 11,
      height: 50,
      label: "Porte vers Salle Laboratoire",
      action: () => {
        setCurrentRoomIndex(2);
        setChatMessages([]);
        if (socket && disjoncteurResolu) {
          socket.emit("playerMove", { room: "Salle Laboratoire" });
        }
      },
    },
    {
      id: "porte_archives",
      x: 71,
      y: 41,
      width: 5,
      height: 35,
      label: "Porte vers Salle Archives",
      action: () => {
        setCurrentRoomIndex(3);
        setChatMessages([]);
        if (socket && disjoncteurResolu) {
          socket.emit("playerMove", { room: "Salle Archives" });
        }
      },
    },
    {
      id: "porte_toilette",
      x: 66,
      y: 52,
      width: 3,
      height: 20,
      label: "Porte vers les toilettes",
      action: () => {
        setCurrentRoomIndex(6);
        setChatMessages([]);
        if (socket && disjoncteurResolu) {
          socket.emit("playerMove", { room: "Salle Toilettes" });
        }
      },
    },
    {
      id: "porte_fermee",
      x: 31,
      y: 52,
      width: 3,
      height: 20,
      label: "Porte fermée",
      action: () => {},
    },
    {
      id: "porte_vestiaires",
      x: 24,
      y: 45,
      width: 5,
      height: 32,
      label: "Porte vers Salle Vestiaires",
      action: () => {
        setCurrentRoomIndex(4);
        setChatMessages([]);
        if (socket && disjoncteurResolu) {
          socket.emit("playerMove", { room: "Salle Vestiaires" });
        }
      },
    },
    {
      id: "porte_securise",
      x: 43,
      y: 48,
      width: 14,
      height: 25,
      label: "Porte vers Salle Sécurisée",
      action: () => {
        setCurrentRoomIndex(5);
        setChatMessages([]);
            if (socket && disjoncteurResolu) {
              // if (codeObtenus)
              socket.emit("playerMove", { room: "Salle Sécurisée" });
              // else
              // showModal(PorteSecuriseeModal)
            }
      },
    },
  ],
});
