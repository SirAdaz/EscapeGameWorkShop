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
  helpMessages?: {[key: string]: string[]};
  onSendHelpMessage?: (message: string) => void;
  timeLeft?: number;
  totalHelpUsed?: number;
  maxHelpAllowed?: number;
}

export default function ChatSystem({ currentRoom, isOpen, onToggle, messages, onSendMessage, helpMessages, onSendHelpMessage, timeLeft = 60 * 60, totalHelpUsed = 0, maxHelpAllowed = 5 }: ChatSystemProps) {
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'help'>('chat');

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

  const getHelpMessage = (timeLeft: number) => {
    const roomHints: {[key: string]: string} = {
      'Entrée - Hall Principal': '💡 Cherchez l\'enveloppe sur le bureau pour comprendre votre mission !',
      'Salle Serveur': '💡 Le disjoncteur doit être réparé avant d\'accéder aux ordinateurs !',
      'Salle Laboratoire': '💡 Les équations chimiques contiennent des indices précieux !',
      'Salle Archives': '💡 Les dossiers sont classés par thème, cherchez les correspondances !',
      'Salle Vestiaires': '💡 Les casiers ont des numéros, l\'indice sur le mur vous aidera !',
      'Salle Administrateur': '💡 Les jauges nécessitent les codes collectés dans les autres salles !'
    };

    const timeHints: {[key: string]: string} = {
      'high': '⏰ Vous avez encore du temps, explorez méthodiquement chaque salle !',
      'medium': '⚠️ Le temps presse ! Concentrez-vous sur les hotspots les plus importants !',
      'low': '🚨 URGENCE ! Cherchez les codes dans l\'ordre : Serveur → Laboratoire → Archives → Vestiaires !',
      'critical': '💀 DERNIÈRES SECONDES ! Le coffre-fort nécessite 4 codes, vérifiez votre inventaire !'
    };

    let timeCategory = 'high';
    if (timeLeft < 300) timeCategory = 'medium';
    if (timeLeft < 120) timeCategory = 'low';
    if (timeLeft < 30) timeCategory = 'critical';

    const roomHint = roomHints[currentRoom] || '💡 Explorez tous les hotspots de cette salle !';
    const timeHint = timeHints[timeCategory];

    return `${roomHint}\n\n${timeHint}`;
  };

  const handleSendHelp = () => {
    if (onSendHelpMessage && totalHelpUsed < maxHelpAllowed) {
      const helpMessage = getHelpMessage(timeLeft);
      onSendHelpMessage(helpMessage);
    }
  };

  const canUseHelp = totalHelpUsed < maxHelpAllowed;
  const helpRemaining = maxHelpAllowed - totalHelpUsed;

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
      <div className="bg-blue-600 text-white p-3 rounded-t-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="font-bold">💬 Chat de Salle</div>
            <div className="text-xs opacity-70">Salle: {currentRoom}</div>
            {activeTab === 'help' && (
              <div className="text-xs opacity-50">
                💡 Aide: {helpRemaining}/{maxHelpAllowed} restants
              </div>
            )}
          </div>
          <button
            onClick={onToggle}
            className="text-white hover:text-gray-300 text-xl"
          >
            ✕
          </button>
        </div>
        
        {/* Onglets */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
              activeTab === 'chat' 
                ? 'bg-blue-500 text-white' 
                : 'bg-blue-700 text-blue-200 hover:bg-blue-600'
            }`}
          >
            💬 Messages
          </button>
          <button
            onClick={() => setActiveTab('help')}
            className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
              activeTab === 'help' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-yellow-700 text-yellow-200 hover:bg-yellow-600'
            }`}
          >
            💡 Aide ({helpRemaining})
          </button>
        </div>
      </div>

      {/* Contenu selon l'onglet actif */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-700">
        {activeTab === 'chat' ? (
          // Messages normaux
          messages.map((msg) => (
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
          ))
        ) : (
          // Messages d'aide de la salle actuelle uniquement
          helpMessages && helpMessages[currentRoom] && helpMessages[currentRoom].length > 0 ? (
            <div className="mb-4">
              <div className="text-xs font-bold text-yellow-400 mb-2">
                📍 {currentRoom}
              </div>
              {helpMessages[currentRoom].map((message, index) => (
                <div key={index} className="bg-yellow-900 bg-opacity-50 p-2 rounded text-sm text-yellow-200 mb-2">
                  {message}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-yellow-400 text-sm">
              Aucun indice donné pour cette salle
            </div>
          )
        )}
      </div>

      {/* Input selon l'onglet actif */}
      <div className="p-3 border-t border-gray-600 bg-gray-800">
        {activeTab === 'chat' ? (
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
        ) : (
          <div className="text-center">
            {canUseHelp ? (
              <button
                onClick={handleSendHelp}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded font-bold"
              >
                💡 Demander un indice
              </button>
            ) : (
              <div className="text-red-400 text-sm font-bold">
                ❌ Plus d'aide disponible (5/5 utilisés)
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
