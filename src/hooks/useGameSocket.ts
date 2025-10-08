import { useEffect } from 'react';
import React from 'react';
import { Socket } from 'socket.io-client';

interface UseGameSocketProps {
  socket: Socket | null;
  setTimeLeft: (time: number) => void;
  setInventory: (inventory: string[]) => void;
  setDisjoncteurResolu: (resolved: boolean) => void;
  setAccesAdmin: (admin: boolean) => void;
  setGameEnded: (ended: boolean) => void;
  setPlayers: React.Dispatch<React.SetStateAction<any[]>>;
  setChatMessages: React.Dispatch<React.SetStateAction<any[]>>;
  setHelpMessages: React.Dispatch<React.SetStateAction<{ [key: string]: string[] }>>;
  setTotalHelpUsed: React.Dispatch<React.SetStateAction<number>>;
  setHelpCooldown: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export const useGameSocket = ({
  socket,
  setTimeLeft,
  setInventory,
  setDisjoncteurResolu,
  setAccesAdmin,
  setGameEnded,
  setPlayers,
  setChatMessages,
  setHelpMessages,
  setTotalHelpUsed,
  setHelpCooldown,
}: UseGameSocketProps) => {
  useEffect(() => {
    if (!socket) return;

    const socketInstance = socket as any;

    socketInstance.on("gameState", (state: any) => {
      setTimeLeft(state.timeLeft);
      setInventory(state.inventory);
      setDisjoncteurResolu(state.disjoncteurResolu);
      setAccesAdmin(state.accesAdmin);
      setGameEnded(state.gameEnded);
    });

    socketInstance.on("playersList", (playersList: any) => {
      setPlayers(playersList);
    });

    socketInstance.on("chatMessage", (message: any) => {
      setChatMessages((prev: any[]) => [...prev, message]);
    });

    socketInstance.on("helpMessage", (data: any) => {
      setHelpMessages(data.helpMessages);
      setTotalHelpUsed(data.totalHelpUsed);
      setHelpCooldown(data.helpCooldown ? new Date(data.helpCooldown) : undefined);
    });

    socketInstance.on("playerJoined", (player: any) => {
      // Nouveau joueur connecté
    });

    socketInstance.on("playerLeft", (playerId: any) => {
      // Joueur déconnecté
    });

    return () => {
      socketInstance.off("gameState");
      socketInstance.off("playersList");
      socketInstance.off("chatMessage");
      socketInstance.off("helpMessage");
      socketInstance.off("playerJoined");
      socketInstance.off("playerLeft");
    };
  }, [socket, setTimeLeft, setInventory, setDisjoncteurResolu, setAccesAdmin, setGameEnded, setPlayers, setChatMessages, setHelpMessages, setTotalHelpUsed, setHelpCooldown]);
};
