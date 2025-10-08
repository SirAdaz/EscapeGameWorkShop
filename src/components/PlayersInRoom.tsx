interface Player {
  id: string;
  name: string;
  room: string;
}

interface PlayersInRoomProps {
  currentRoomName: string;
  players: Player[];
}

export default function PlayersInRoom({ currentRoomName, players }: PlayersInRoomProps) {
  const playersInRoom = players.filter((player) => player.room === currentRoomName);

  return (
    <div className="absolute bottom-4 left-4 bg-black bg-opacity-80 text-white p-3 rounded-lg">
      <div className="text-sm font-bold mb-2">👥 {currentRoomName}</div>
      <div className="text-xs space-y-1">
        {playersInRoom.length === 0 ? (
          <div className="text-gray-400">Vous êtes seul ici</div>
        ) : (
          playersInRoom.map((player, index) => (
            <div key={player.id} className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  index === 0
                    ? "bg-green-500"
                    : index === 1
                    ? "bg-blue-500"
                    : index === 2
                    ? "bg-yellow-500"
                    : "bg-purple-500"
                }`}
              ></div>
              <span className="text-gray-300">{player.name}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
