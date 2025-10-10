import { useGameState } from "@/hooks/useGameState";
import { Room } from "../RoomsData";

export const createHallPrincipal = (
  showModal: (content: string) => void,
  setCurrentRoomIndex: (index: number) => void,
  setChatMessages: (messages: any[]) => void,
  socket: any,
  disjoncteurResolu: boolean,
  codeGeneralObtenu: boolean
): Room => {
  return {
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
        setChatMessages([]);
        if (socket) {
          setCurrentRoomIndex(1);
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
        setChatMessages([]);
        if (socket && disjoncteurResolu) {
          setCurrentRoomIndex(2);
          socket.emit("playerMove", { room: "Salle Laboratoire" });
        }
      },
    },
    {
      id: "porte_archives",
      x: 71,
      y: 46,
      width: 5,
      height: 35,
      label: "Porte vers Salle Archives",
      action: () => {
        setChatMessages([]);
        if (socket && disjoncteurResolu) {
          setCurrentRoomIndex(4);
          socket.emit("playerMove", { room: "Salle Archives" });
        }
      },
    },
    {
      id: "porte_toilette",
      x: 66,
      y: 54,
      width: 3,
      height: 24,
      label: "Porte vers les toilettes",
      action: () => {
        setChatMessages([]);
        if (socket && disjoncteurResolu) {
          setCurrentRoomIndex(6);
          socket.emit("playerMove", { room: "Salle Toilettes" });
        }
      },
    },
    {
      id: "porte_fermee",
      x: 31,
      y: 55,
      width: 3,
      height: 22,
      label: "Porte fermée",
      action: () => {},
    },
    {
      id: "porte_vestiaires",
      x: 24,
      y: 47,
      width: 5,
      height: 32,
      label: "Porte vers Salle Vestiaires",
      action: () => {
        setChatMessages([]);
        if (socket && disjoncteurResolu) { 
          setCurrentRoomIndex(4);
          socket.emit("playerMove", { room: "Salle Vestiaires" });
        }
      },
    },
    {
      id: "porte_securise",
      x: 43,
      y: 52,
      width: 14,
      height: 25,
      label: "Porte vers Salle Sécurisée",
      action: () => {
        if (socket && (disjoncteurResolu || true)) { // Temporaire pour test
          if (codeGeneralObtenu) {
            setChatMessages([]);
            setCurrentRoomIndex(5);
            socket.emit("playerMove", { room: "Salle Sécurisée" });
          } else {
            showModal("PorteSecuriseeModal");
          }
        }
      },
    },
  ],
  };
};
