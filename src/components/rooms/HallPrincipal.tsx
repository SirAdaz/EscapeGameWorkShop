import { Room } from "../RoomsData";

export const createHallPrincipal = (
  setCurrentRoomIndex: (index: number) => void,
  setChatMessages: (messages: any[]) => void,
  socket: any
): Room => ({
  id: 1,
  name: "Entrée - Hall Principal",
  imageSrc: "/images/Hall.png",
  description:
    "Hall d'entrée de l'usine abandonnée. Des combinaisons de protection traînent au sol.",
  hotspots: [
    {
      id: "porte_serveur",
      x: 89,
      y: 41,
      width: 8,
      height: 48,
      label: "🚪 Porte vers Salle Serveur",
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
      x: 2,
      y: 40,
      width: 7,
      height: 45,
      label: "🚪 Porte vers Salle Laboratoire",
      action: () => {
        setCurrentRoomIndex(2);
        setChatMessages([]);
        if (socket) {
          socket.emit("playerMove", { room: "Salle Laboratoire" });
        }
      },
    },
    {
      id: "porte_archives",
      x: 81,
      y: 45,
      width: 4.5,
      height: 38,
      label: "🚪 Porte vers Salle Archives",
      action: () => {
        setCurrentRoomIndex(3);
        setChatMessages([]);
        if (socket) {
          socket.emit("playerMove", { room: "Salle Archives" });
        }
      },
    },
    {
      id: "porte_vestiaires",
      x: 13,
      y: 45,
      width: 5,
      height: 36,
      label: "🚪 Porte vers Salle Vestiaires",
      action: () => {
        setCurrentRoomIndex(4);
        setChatMessages([]);
        if (socket) {
          socket.emit("playerMove", { room: "Salle Vestiaires" });
        }
      },
    },
    {
      id: "porte_securise",
      x: 40,
      y: 21,
      width: 19,
      height: 33,
      label: "🚪 Porte vers Salle Sécurisée",
      action: () => {
        setCurrentRoomIndex(5);
        setChatMessages([]);
            if (socket) {
              socket.emit("playerMove", { room: "Salle Sécurisée" });
            }
      },
    },
  ],
});
