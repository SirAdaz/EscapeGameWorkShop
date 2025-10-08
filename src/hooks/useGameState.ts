import { useState } from 'react';

export const useGameState = () => {
  // États de base du jeu
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes en secondes
  const [inventory, setInventory] = useState<string[]>([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);

  // États des puzzles
  const [disjoncteurResolu, setDisjoncteurResolu] = useState(false);
  const [accesAdmin, setAccesAdmin] = useState(false);

  // États des joueurs et communication
  const [players, setPlayers] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  
  // États d'aide globale
  const [helpMessages, setHelpMessages] = useState<{ [key: string]: string[] }>({});
  const [totalHelpUsed, setTotalHelpUsed] = useState(0);
  const [helpCooldown, setHelpCooldown] = useState<Date | undefined>(undefined);

  // États de l'interface
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [initialHelpCooldown, setInitialHelpCooldown] = useState<Date | undefined>(undefined);

  // Fonctions utilitaires
  const showModal = (content: string) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const addToInventory = (item: string, socket: any) => {
    if (!inventory.includes(item)) {
      setInventory((prev) => [...prev, item]);
      if (socket) {
        socket.emit("addToInventory", item);
      }
    }
  };

  const handleAccessGranted = (socket: any) => {
    setAccessGranted(true);
    setTimeLeft(60 * 60); // Réinitialiser le timer à 60 minutes
    setInventory([]); // Réinitialiser l'inventaire
    setGameEnded(false); // Réinitialiser l'état de fin
    setDisjoncteurResolu(false); // Réinitialiser les états
    setAccesAdmin(false);
    
    // Déclencher le cooldown initial de 5 minutes dès l'entrée du code
    const initialCooldown = new Date();
    initialCooldown.setMinutes(initialCooldown.getMinutes() + 5);
    setInitialHelpCooldown(initialCooldown);
    
    // Synchroniser le cooldown initial avec le serveur
    if (socket) {
      socket.emit("helpMessage", {
        helpMessages: {},
        totalHelpUsed: 0,
        helpCooldown: initialCooldown.toISOString(),
      });
    }
  };

  return {
    // États
    currentRoomIndex,
    setCurrentRoomIndex,
    timeLeft,
    setTimeLeft,
    inventory,
    setInventory,
    gameEnded,
    setGameEnded,
    accessGranted,
    setAccessGranted,
    disjoncteurResolu,
    setDisjoncteurResolu,
    accesAdmin,
    setAccesAdmin,
    players,
    setPlayers,
    chatMessages,
    setChatMessages,
    helpMessages,
    setHelpMessages,
    totalHelpUsed,
    setTotalHelpUsed,
    helpCooldown,
    setHelpCooldown,
    modalOpen,
    setModalOpen,
    modalContent,
    setModalContent,
    initialHelpCooldown,
    setInitialHelpCooldown,
    
    // Fonctions utilitaires
    showModal,
    addToInventory,
    handleAccessGranted,
  };
};
