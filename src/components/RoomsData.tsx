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
  setCasiersResolu: (val: boolean) => void;
  disjoncteurResolu: boolean;
  casiersResolu: boolean;
  casiersProgress: { current: number; total: number };
  setCasiersProgress: (progress: { current: number; total: number }) => void;
  currentCasierNumber: string | null;
  setCurrentCasierNumber: (number: string | null) => void;
  accesAdmin: boolean;
  inventory: string[];
  codeLaboObtenu: boolean;
  codeGeneralObtenu: boolean;
}

export const createRoomsData = ({
  setCurrentRoomIndex,
  setChatMessages,
  socket,
  showModal,
  addToInventory,
  setAccesAdmin,
  setCasiersResolu,
  disjoncteurResolu,
  casiersResolu,
  casiersProgress,
  setCasiersProgress,
  currentCasierNumber,
  setCurrentCasierNumber,
  accesAdmin,
  inventory,
  codeLaboObtenu,
  codeGeneralObtenu
}: RoomsDataProps): Room[] => {
  const rooms: Room[] = [
    createHallPrincipal(showModal, setCurrentRoomIndex, setChatMessages, socket, disjoncteurResolu, codeGeneralObtenu),
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
      addToInventory,
      setCasiersResolu,
      casiersResolu,
      casiersProgress,
      setCasiersProgress,
      currentCasierNumber,
      setCurrentCasierNumber
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
      showModal,
      codeLaboObtenu
    )
  ];

  return rooms;
};
