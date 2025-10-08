import { Socket } from "socket.io-client";
import { createHallPrincipal } from "./rooms/HallPrincipal";
import { createSalleServeur } from "./rooms/SalleServeur";
import { createSalleLaboratoire } from "./rooms/SalleLaboratoire";
import { createSalleArchives } from "./rooms/SalleArchives";
import { createSalleVestiaires } from "./rooms/SalleVestiaires";
import { createSalleSecurisee } from "./rooms/SalleSecurisee";
import { createSalleToilettes } from "./rooms/SalleToilettes";
import { createSalleLaboratoireNiveau2 } from "./rooms/SalleLaboratoireNiveau2";

export interface Hotspot {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  action: () => void;
}

export interface Room {
  id: number;
  name: string;
  imageSrc: string;
  description: string;
  hotspots: Hotspot[];
}

export interface RoomsDataProps {
  setCurrentRoomIndex: (index: number) => void;
  setChatMessages: (messages: any[]) => void;
  socket: Socket | null;
  showModal: (content: string) => void;
  addToInventory: (item: string) => void;
  setAccesAdmin: (admin: boolean) => void;
  disjoncteurResolu: boolean;
  accesAdmin: boolean;
  inventory: string[];
}

export const createRoomsData = ({
  setCurrentRoomIndex,
  setChatMessages,
  socket,
  showModal,
    addToInventory,
  setAccesAdmin,
  disjoncteurResolu,
  accesAdmin,
  inventory,
}: RoomsDataProps): Room[] => {
  const rooms: Room[] = [
    createHallPrincipal(setCurrentRoomIndex, setChatMessages, socket),
    createSalleServeur(
      setCurrentRoomIndex,
      setChatMessages,
      socket,
      showModal,
      addToInventory,
      disjoncteurResolu,
      accesAdmin
    ),
    createSalleLaboratoire(
      showModal,
      addToInventory
    ),
    createSalleArchives(
      setCurrentRoomIndex,
      setChatMessages,
      socket,
      showModal,
      addToInventory
    ),
    createSalleVestiaires(
      setCurrentRoomIndex,
      setChatMessages,
      socket,
      showModal,
      addToInventory
    ),
    createSalleSecurisee(
      setCurrentRoomIndex,
      setChatMessages,
      socket,
      showModal,
      setAccesAdmin,
      inventory
    ),
    createSalleToilettes(      
      setChatMessages
    ),
    createSalleLaboratoireNiveau2(
      setChatMessages,
      showModal
    )
  ];

  return rooms;
};
