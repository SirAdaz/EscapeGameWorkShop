import { createRoomsData } from "@/components/RoomsData";

interface UseRoomsProps {
  setCurrentRoomIndex: (index: number) => void;
  setChatMessages: (messages: any[]) => void;
  socket: any;
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

export const useRooms = ({
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
  codeGeneralObtenu,
}: UseRoomsProps) => {
  const rooms = createRoomsData({
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
    codeGeneralObtenu,
  });

  return {
    rooms,
  };
};
