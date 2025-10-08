const { Server } = require('socket.io');
const http = require('http');

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// État global du jeu
let gameState = {
  timeLeft: 60 * 60, // 60 minutes en secondes
  players: [],
  inventory: [],
  disjoncteurResolu: false,
  accesAdmin: false,
  gameStarted: false,
  gameEnded: false
};

// État des aides globales
let helpState = {
  helpMessages: {},
  totalHelpUsed: 0,
  helpCooldown: null
};

// Liste des joueurs connectés
let players = {};

// Compteur global pour les noms de joueurs
let playerCounter = 0;

// Timer global
let gameTimer = null;

const startGameTimer = () => {
  if (gameTimer) return; // Timer déjà en cours
  
  gameTimer = setInterval(() => {
    gameState.timeLeft--;
    
    if (gameState.timeLeft <= 0) {
      gameState.gameEnded = true;
      gameState.timeLeft = 0;
      clearInterval(gameTimer);
      gameTimer = null;
    }
    
    // Diffuser l'état à tous les joueurs
    io.emit('gameState', gameState);
  }, 1000);
};

io.on('connection', (socket) => {
  console.log('Joueur connecté:', socket.id);
  
  // Ajouter le joueur à la liste
  playerCounter++;
  const player = {
    id: socket.id,
    name: `Joueur ${playerCounter}`,
    room: 'Hall Principal'
  };
  
  players[socket.id] = player;
  gameState.players.push(player);
  
  // Émettre la liste des joueurs à tous les clients
  io.emit('playersList', Object.values(players));
  
  // Si c'est le premier joueur, démarrer le timer
  if (Object.keys(players).length === 1) {
    gameState.gameStarted = true;
    startGameTimer();
  }
  
  // Envoyer l'état actuel au nouveau joueur
  socket.emit('gameState', gameState);
  
  // Envoyer l'état des aides au nouveau joueur
  socket.emit('helpMessage', {
    helpMessages: helpState.helpMessages,
    totalHelpUsed: helpState.totalHelpUsed,
    helpCooldown: helpState.helpCooldown
  });
  
  // Rejoindre la room Socket.io correspondant à la salle
  socket.join(player.room);
  
  // Notifier tous les joueurs du nouveau joueur
  io.emit('playerJoined', player);
  
  // Gestion des messages de chat
  socket.on('chatMessage', (message) => {
    const chatMessage = {
      id: Date.now(),
      player: player.name,
      message: message,
      timestamp: new Date(),
      room: player.room
    };
    
    // Envoyer le message seulement aux joueurs de la même salle
    socket.to(player.room).emit('chatMessage', chatMessage);
    socket.emit('chatMessage', chatMessage); // Envoyer aussi à l'expéditeur
  });
  
  // Gestion des actions de jeu
  socket.on('addToInventory', (item) => {
    if (!gameState.inventory.includes(item)) {
      gameState.inventory.push(item);
      io.emit('gameState', gameState);
    }
  });
  
  socket.on('setDisjoncteurResolu', (value) => {
    gameState.disjoncteurResolu = value;
    io.emit('gameState', gameState);
  });
  
  socket.on('setAccesAdmin', (value) => {
    gameState.accesAdmin = value;
    io.emit('gameState', gameState);
  });
  
  // Gestion des messages d'aide
  socket.on('helpMessage', (data) => {
    console.log('Serveur reçoit helpMessage:', data);
    // Mettre à jour l'état global des aides
    helpState.helpMessages = data.helpMessages;
    helpState.totalHelpUsed = data.totalHelpUsed;
    helpState.helpCooldown = data.helpCooldown;
    
    console.log('Serveur diffuse helpMessage:', {
      helpMessages: helpState.helpMessages,
      totalHelpUsed: helpState.totalHelpUsed,
      helpCooldown: helpState.helpCooldown
    });
    
    // Diffuser à tous les joueurs
    io.emit('helpMessage', {
      helpMessages: helpState.helpMessages,
      totalHelpUsed: helpState.totalHelpUsed,
      helpCooldown: helpState.helpCooldown
    });
  });
  
  socket.on('playerMove', (data) => {
    // Mettre à jour la position du joueur
    if (players[socket.id]) {
      const oldRoom = players[socket.id].room;
      players[socket.id].room = data.room;
      
      // Mettre à jour dans gameState aussi
      const playerIndex = gameState.players.findIndex(p => p.id === socket.id);
      if (playerIndex !== -1) {
        gameState.players[playerIndex].room = data.room;
      }
      
      // Changer de room Socket.io
      socket.leave(oldRoom);
      socket.join(data.room);
      
      // Notifier tous les joueurs du changement
      io.emit('playersList', Object.values(players));
    }
  });
  
  // Déconnexion
  socket.on('disconnect', () => {
    console.log('Joueur déconnecté:', socket.id);
    
    // Retirer le joueur de la liste
    delete players[socket.id];
    gameState.players = gameState.players.filter(p => p.id !== socket.id);
    
    // Émettre la liste mise à jour
    io.emit('playersList', Object.values(players));
    
    // Si plus de joueurs, arrêter le timer
    if (Object.keys(players).length === 0) {
      if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
      }
      // Réinitialiser l'état du jeu
      gameState = {
        timeLeft: 60 * 60,
        players: [],
        inventory: [],
        disjoncteurResolu: false,
        accesAdmin: false,
        gameStarted: false,
        gameEnded: false
      };
      
      // Réinitialiser l'état des aides
      helpState = {
        helpMessages: {},
        totalHelpUsed: 0,
        helpCooldown: null
      };
      
      // Réinitialiser le compteur de joueurs
      playerCounter = 0;
    }
    
    io.emit('playerLeft', socket.id);
    io.emit('playersList', Object.values(players));
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Serveur Socket.io démarré sur le port ${PORT}`);
});
