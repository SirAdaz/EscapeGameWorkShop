'use client';

import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { useGameState } from '@/hooks/useGameState';

interface ServerGameState {
  timeLeft: number;
  inventory: string[];
  disjoncteurResolu: boolean;
  jaugesResolues: boolean;
  accesAdmin: boolean;
  gameEnded: boolean;

  codeLabo: boolean;
  codeGeneral: boolean;
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
    setJaugesResolues,
    setAccesAdmin,
    
    setGameEnded,
    setPlayers,
    setChatMessages,
    
    setHelpMessages,
    setTotalHelpUsed,
    setHelpCooldown,

    setCodeLaboObtenu,
    setCodeGeneralObtenu
  } = useGameState();

  useEffect(() => {
    if (!socket) return;

    // --- Game state sync ---
    socket.on('gameState', (state: ServerGameState) => {
      setTimeLeft(state.timeLeft);
      setInventory(state.inventory);
      setDisjoncteurResolu(state.disjoncteurResolu);
      setJaugesResolues(state.jaugesResolues);
      setAccesAdmin(state.accesAdmin);
      setGameEnded(state.gameEnded);

      setCodeLaboObtenu(state.codeLabo);
      setCodeGeneralObtenu(state.codeGeneral);
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

    // --- Code général débloqué ---
    socket.on('codeGeneralUnlocked', () => {
      setCodeGeneralObtenu(true);
    });

    // --- Player join/leave events ---
    socket.on('playerJoined', (player: any) => {
      console.log('Player joined:', player, 'Stack trace:', new Error().stack);
    });

    socket.on('playerLeft', (playerId: any) => {
      console.log('Player left:', playerId, 'Stack trace:', new Error().stack);
    });

    // --- Cleanup ---
    return () => {
      socket.off('gameState');
      socket.off('playersList');
      socket.off('chatMessage');
      socket.off('helpMessage');
      socket.off('codeGeneralUnlocked');
      socket.off('playerJoined');
      socket.off('playerLeft');
    };
  }, [
    socket,
    setTimeLeft,
    setInventory,

    setDisjoncteurResolu,
    setJaugesResolues,
    setAccesAdmin,
    
    setGameEnded,
    setPlayers,
    setChatMessages,
    
    setHelpMessages,
    setTotalHelpUsed,
    setHelpCooldown,

    setCodeLaboObtenu,
    setCodeGeneralObtenu
  ]);
};
