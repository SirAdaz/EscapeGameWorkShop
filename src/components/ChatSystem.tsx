'use client';

import { useState } from 'react';

interface Message {
  id: number;
  player: string;
  message: string;
  timestamp: string | Date;
  room: string;
}

interface ChatSystemProps {
  currentRoom: string;
  isOpen: boolean;
  onToggle: () => void;
  socket?: any;
  messages: any[];
  onSendMessage: (message: string) => void;
}

export default function ChatSystem({ currentRoom, isOpen, onToggle, messages, onSendMessage }: ChatSystemProps) {
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200"
        title="Ouvrir le chat d'équipe"
      >
        💬
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 rounded-lg shadow-2xl w-80 h-96 flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
        <div>
          <div className="font-bold">💬 Chat d'Équipe</div>
          <div className="text-xs opacity-70">Salle: {currentRoom}</div>
        </div>
        <button
          onClick={onToggle}
          className="text-white hover:text-gray-300 text-xl"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-700">
        {messages.map((msg) => (
          <div key={msg.id} className="text-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-blue-400">{msg.player}</span>
              <span className="text-xs text-gray-400">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="bg-gray-600 p-2 rounded text-white">
              {msg.message}
            </div>
            {msg.room !== 'Général' && (
              <div className="text-xs text-gray-500 mt-1">
                📍 {msg.room}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-600 bg-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tapez votre message..."
            className="flex-1 bg-gray-600 text-white px-3 py-2 rounded border border-gray-500"
            maxLength={100}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}
