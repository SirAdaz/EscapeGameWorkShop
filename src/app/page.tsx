"use client";

import Room from "@/components/Room";
import ChatSystem from "@/components/ChatSystem";
import Timer from "@/components/Timer";
import Modal from "@/components/Modal";
import Inventory from "@/components/Inventory";
import AccessCode from "@/components/AccessCode";
import PlayersInRoom from "@/components/PlayersInRoom";
import GameOver from "@/components/GameOver";
import Victory from "@/components/Victory";
import { LaboratoireNavigation } from "@/components/LaboratoireNavigation";
import { useSocket } from "@/hooks/useSocket";
import { useGameSocket } from "@/hooks/useGameSocket";
import { useGameState } from "@/hooks/useGameState";
import { useRooms } from "@/hooks/useRooms";


export default function Home() {
  const { socket } = useSocket();
  
  // Gestion centralisée de tous les états du jeu
  const {
    currentRoomIndex,
    setCurrentRoomIndex,
    timeLeft,
    setTimeLeft,
    inventory,
    setInventory,
    gameEnded,
    setGameEnded,
    gameWon,
    setGameWon,
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
    showModal,
    addToInventory,
    handleAccessGranted,
  } = useGameState();

  // Gestion des événements Socket.io
  useGameSocket({
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
  });

  // Configuration des salles de Tchernobyl2
  const { rooms } = useRooms({
    setCurrentRoomIndex,
    setChatMessages,
    socket,
    showModal,
    addToInventory: (item: string) => addToInventory(item, socket),
    setAccesAdmin,
    disjoncteurResolu,
    accesAdmin,
    inventory,
  });

  const currentRoom = rooms[currentRoomIndex];

  // Écran de code d'accès
  if (!accessGranted) {
    return (
      <AccessCode
        timeLeft={timeLeft}
        onAccessGranted={() => handleAccessGranted(socket)}
      />
    );
  }

  // Écran de fin de jeu
  if (gameEnded) {
    return <GameOver />;
  }

  // Écran de victoire
  if (gameWon) {
    return <Victory />;
  }

  return (
    <main className="h-screen w-screen overflow-hidden relative">
      <Room
        imageSrc={currentRoom.imageSrc}
        hotspots={currentRoom.hotspots}
        showBackButton={currentRoomIndex > 0}
        onBack={currentRoomIndex > 0 ? () => {
          setCurrentRoomIndex(0);
          setChatMessages([]);
          if (socket) {
            (socket as any).emit('playerMove', { room: rooms[0].name });
          }
        } : undefined}
      />

      {/* Interface de jeu */}
      <Timer timeLeft={timeLeft} />

      {/* Navigation pour les salles de laboratoire */}
      <LaboratoireNavigation
        currentRoomIndex={currentRoomIndex}
        onToggleView={() => {
          if (currentRoomIndex === 2) {
            // Aller au niveau 2
            setCurrentRoomIndex(7);
            setChatMessages([]);
            if (socket) {
              (socket as any).emit("playerMove", { room: "Salle Laboratoire - Détail" });
            }
          } else if (currentRoomIndex === 7) {
            // Retour au niveau 1
            setCurrentRoomIndex(2);
            setChatMessages([]);
            if (socket) {
              (socket as any).emit("playerMove", { room: "Salle Laboratoire" });
            }
          }
        }}
      />

      {/* Inventaire */}
      <Inventory items={inventory} />

      {/* Joueurs présents dans la pièce */}
      <PlayersInRoom
        currentRoomName={currentRoom.name}
        players={players}
      />

      {/* Système de chat avec onglets */}
      <ChatSystem
        currentRoom={currentRoom.name}
        messages={chatMessages}
        onSendMessage={(message) => {
          if (socket) {
            (socket as any).emit("chatMessage", message);
          }
        }}
        socket={socket}
        timeLeft={timeLeft}
        helpMessages={helpMessages}
        totalHelpUsed={totalHelpUsed}
        helpCooldown={helpCooldown}
      />
      {/* Modal pour les messages d'information */}
      <Modal
        isOpen={modalOpen}
        content={modalContent}
        onClose={() => setModalOpen(false)}
        onVictory={() => setGameWon(true)}
      />
    </main>
  );
}
