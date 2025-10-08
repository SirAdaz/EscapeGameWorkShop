import { createRoomsData } from "@/components/RoomsData";

interface UseRoomsProps {
  setCurrentRoomIndex: (index: number) => void;
  setChatMessages: (messages: any[]) => void;
  socket: any;
  showModal: (content: string) => void;
  setDisjoncteurOpen: (open: boolean) => void;
  addToInventory: (item: string, socket: any) => void;
  setAccesAdmin: (admin: boolean) => void;
  disjoncteurResolu: boolean;
  accesAdmin: boolean;
  inventory: string[];
}

export const useRooms = ({
  setCurrentRoomIndex,
  setChatMessages,
  socket,
  showModal,
  setDisjoncteurOpen,
  addToInventory,
  setAccesAdmin,
  disjoncteurResolu,
  accesAdmin,
  inventory,
}: UseRoomsProps) => {
  // Configuration des salles de Tchernobyl2
  const rooms = createRoomsData({
    setCurrentRoomIndex,
    setChatMessages,
    socket,
    showModal,
    setDisjoncteurOpen,
    addToInventory,
    setAccesAdmin,
    disjoncteurResolu,
    accesAdmin,
    inventory,
  });

  return {
    rooms,
  };
};
