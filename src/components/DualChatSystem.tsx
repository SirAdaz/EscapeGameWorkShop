import { useState, useEffect } from "react";
import ChatSystem from "./ChatSystem";

interface DualChatSystemProps {
  currentRoom: string;
  messages: any[];
  onSendMessage: (message: string) => void;
  socket: any;
  timeLeft: number;
  initialHelpCooldown?: Date;
}

export default function DualChatSystem({
  currentRoom,
  messages,
  onSendMessage,
  socket,
  timeLeft,
  initialHelpCooldown,
}: DualChatSystemProps) {
  const [chatOpen, setChatOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpMessages, setHelpMessages] = useState<{ [key: string]: string[] }>({});
  const [totalHelpUsed, setTotalHelpUsed] = useState(0);
  const [helpCooldown, setHelpCooldown] = useState<Date | undefined>(initialHelpCooldown);

  // Mise à jour du cooldown d'aide en temps réel
  useEffect(() => {
    if (!helpCooldown) return;

    const interval = setInterval(() => {
      if (new Date() >= helpCooldown) {
        setHelpCooldown(undefined);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [helpCooldown]);

  const handleSendHelpMessage = (message: string) => {
    // Vérifier si on peut encore utiliser l'aide
    if (totalHelpUsed < 5) {
      // Vérifier si c'est un vrai indice ou un message de cooldown
      if (!helpCooldown || new Date() >= helpCooldown) {
        // C'est un vrai indice, incrémenter le compteur et définir le cooldown
        setTotalHelpUsed((prev) => prev + 1);
        const cooldownTime = new Date();
        cooldownTime.setMinutes(cooldownTime.getMinutes() + 5);
        setHelpCooldown(cooldownTime);
        
        // Ajouter l'indice à l'historique d'aide de la salle
        setHelpMessages((prev) => ({
          ...prev,
          [currentRoom]: [...(prev[currentRoom] || []), message],
        }));
      } else {
        // Pendant le cooldown, afficher un message d'encouragement
        const cooldownMessage = "🔍 Continuez à chercher ! Vous pourrez obtenir de l'aide plus tard.";
        setHelpMessages((prev) => ({
          ...prev,
          [currentRoom]: [...(prev[currentRoom] || []), cooldownMessage],
        }));
      }
    } else {
      // Limite d'aide atteinte
      const limitMessage = "❌ Vous avez atteint la limite d'aide (5/5). Continuez à explorer !";
      setHelpMessages((prev) => ({
        ...prev,
        [currentRoom]: [...(prev[currentRoom] || []), limitMessage],
      }));
    }
  };

  return (
    <>
      {/* Chat normal */}
      <ChatSystem
        currentRoom={currentRoom}
        isOpen={chatOpen}
        onToggle={() => setChatOpen(!chatOpen)}
        messages={messages}
        onSendMessage={onSendMessage}
        helpMessages={{}}
        timeLeft={0}
        totalHelpUsed={0}
        maxHelpAllowed={0}
        helpCooldown={undefined}
        onSendHelpMessage={() => {}}
      />

      {/* Chat d'aide */}
      <ChatSystem
        currentRoom={currentRoom}
        isOpen={helpOpen}
        onToggle={() => setHelpOpen(!helpOpen)}
        messages={[]}
        onSendMessage={() => {}}
        helpMessages={helpMessages}
        timeLeft={timeLeft}
        totalHelpUsed={totalHelpUsed}
        maxHelpAllowed={5}
        helpCooldown={helpCooldown}
        onSendHelpMessage={handleSendHelpMessage}
      />
      
    </>
  );
}
