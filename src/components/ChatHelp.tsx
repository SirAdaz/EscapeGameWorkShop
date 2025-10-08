import ChatSystem from "./ChatSystem";

interface ChatHelpProps {
  currentRoom: string;
  isOpen: boolean;
  onToggle: () => void;
  messages: any[];
  onSendMessage: (message: string) => void;
  helpMessages: { [key: string]: string[] };
  timeLeft: number;
  totalHelpUsed: number;
  maxHelpAllowed: number;
  helpCooldown: Date | undefined;
  onSendHelpMessage: (message: string) => void;
}

export default function ChatHelp({
  currentRoom,
  isOpen,
  onToggle,
  messages,
  onSendMessage,
  helpMessages,
  timeLeft,
  totalHelpUsed,
  maxHelpAllowed,
  helpCooldown,
  onSendHelpMessage,
}: ChatHelpProps) {
  return (
    <ChatSystem
      currentRoom={currentRoom}
      isOpen={isOpen}
      onToggle={onToggle}
      messages={messages}
      onSendMessage={onSendMessage}
      helpMessages={helpMessages}
      timeLeft={timeLeft}
      totalHelpUsed={totalHelpUsed}
      maxHelpAllowed={maxHelpAllowed}
      helpCooldown={helpCooldown}
      onSendHelpMessage={onSendHelpMessage}
    />
  );
}
