'use client';

import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { useGameState } from '@/hooks/useGameState';

interface ServerGameState {
  timeLeft: number;
  inventory: string[];
  disjoncteurResolu: boolean;
  accesAdmin: boolean;
  gameEnded: boolean;
}

interface HelpMessageData {
  helpMessages: { [key: string]: string[] };
  totalHelpUsed: number;
  helpCooldown?: string;
}

export const useGameSocket = (socket: Socket | null) => {
  const {
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
  } = useGameState();

  useEffect(() => {
    if (!socket) return;

    // --- Game state sync ---
    socket.on('gameState', (state: ServerGameState) => {
      setTimeLeft(state.timeLeft);
      setInventory(state.inventory);
      setDisjoncteurResolu(state.disjoncteurResolu);
      setAccesAdmin(state.accesAdmin);
      setGameEnded(state.gameEnded);
    });

    // --- Players list ---
    socket.on('playersList', (playersList: any[]) => {
      setPlayers(playersList);
    });

    // --- Chat messages ---
    socket.on('chatMessage', (message: any) => {
      setChatMessages((prev: any) => [...prev, message]);
    });

    // --- Help system ---
    socket.on('helpMessage', (data: HelpMessageData) => {
      setHelpMessages(data.helpMessages);
      setTotalHelpUsed(data.totalHelpUsed);
      setHelpCooldown(data.helpCooldown ? new Date(data.helpCooldown) : undefined);
    });

    // --- Player join/leave events ---
    socket.on('playerJoined', (player: any) => {
      console.log('Player joined:', player);
    });

    socket.on('playerLeft', (playerId: any) => {
      console.log('Player left:', playerId);
    });

    // --- Cleanup ---
    return () => {
      socket.off('gameState');
      socket.off('playersList');
      socket.off('chatMessage');
      socket.off('helpMessage');
      socket.off('playerJoined');
      socket.off('playerLeft');
    };
  }, [
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
  ]);
};
