'use client';

import { useState, useEffect } from 'react';
import Room from '@/components/Room';
import ChatSystem from '@/components/ChatSystem';
import DisjoncteurPuzzle from '@/components/DisjoncteurPuzzle';
import CasierPuzzle from '@/components/CasierPuzzle';
import { useSocket } from '@/hooks/useSocket';

// Configuration des salles de Tchernobyl2 - sera définie dans le composant

export default function Home() {
  const { socket, connected } = useSocket();
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes en secondes
  const [inventory, setInventory] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false); // Timer démarre après le code
  const [gameEnded, setGameEnded] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [helpMessages, setHelpMessages] = useState<{[key: string]: string[]}>({});
  const [totalHelpUsed, setTotalHelpUsed] = useState(0);
  const [disjoncteurOpen, setDisjoncteurOpen] = useState(false);
  const [casierOpen, setCasierOpen] = useState(false);
  const [disjoncteurResolu, setDisjoncteurResolu] = useState(false);
  const [accesAdmin, setAccesAdmin] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [accessError, setAccessError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [blockedUntil, setBlockedUntil] = useState<Date | undefined>(undefined);
  const [players, setPlayers] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  // Configuration des salles de Tchernobyl2
const rooms = [
  {
    id: 1,
      name: 'Entrée - Hall Principal',
      imageSrc: '/images/eder-pozo-perez-kULiKsPCzIc-unsplash.jpg',
      description: 'Hall d\'entrée de l\'usine abandonnée. Des combinaisons de protection traînent au sol.',
    hotspots: [
      {
          id: 'invitation',
          x: 20,
          y: 40,
          width: 3,
          height: 4,
          label: 'Enveloppe sur le bureau',
          action: () => showModal('📧 INVITATION DÉCRYPTÉE\n\n"Bienvenue dans Tchernobyl2. Le code du coffre-fort est divisé en 4 parties. Trouvez-les dans les salles :\n- Salle Serveur\n- Salle Laboratoire\n- Salle Archives\n- Salle Vestiaires\n\nTemps restant : 60 minutes"'),
        },
        {
          id: 'coffre',
        x: 70,
          y: 30,
          width: 2,
          height: 3,
          label: 'Coffre-fort à 4 chiffres',
          action: () => {
            if (inventory.length === 4) {
              setGameEnded(true);
              showModal('🎉 COFFRE-FORT OUVERT !\n\n✅ Mission accomplie !\n\nVous avez trouvé la souche génétique du Covid-20 et créé le vaccin qui sauvera l\'humanité !\n\n🏆 FÉLICITATIONS !');
            } else {
              showModal(`🔐 COFFRE-FORT\n\nCode requis : 4 chiffres\n\nCodes collectés : ${inventory.length}/4\n\nVous devez encore collecter ${4 - inventory.length} morceau(x) de code !`);
            }
          },
        },
        {
          id: 'combinaison',
          x: 15,
          y: 70,
          width: 2,
          height: 2,
          label: 'Combinaison de protection',
          action: () => showModal('🦺 COMBINAISON DE PROTECTION\n\nTemps de protection : 60 minutes\nRadioactivité détectée : ÉLEVÉE\n\n⚠️ Attention : Votre temps est limité !'),
      },
    ],
  },
  {
    id: 2,
      name: 'Salle Serveur',
      imageSrc: '/images/a-friend-NZYbv1ftbmg-unsplash.jpg',
      description: 'Salle des serveurs informatiques. Des ordinateurs clignotent dans l\'obscurité.',
      hotspots: [
        {
          id: 'pc',
          x: 25,
          y: 35,
          width: 4,
          height: 5,
          label: 'Ordinateur principal',
          action: () => {
            if (!disjoncteurResolu) {
              showModal('💻 ORDINATEUR PRINCIPAL\n\n❌ Pas d\'alimentation électrique !\n\nVous devez d\'abord réparer le disjoncteur.');
              return;
            }
            if (!accesAdmin) {
              showModal('💻 ORDINATEUR PRINCIPAL\n\n❌ Accès administrateur requis !\n\nVous devez d\'abord obtenir les droits d\'accès dans la salle administrateur.');
              return;
            }
            showModal('💻 ORDINATEUR PRINCIPAL\n\n✅ Accès administrateur confirmé !\n\nOutils disponibles :\n- Déchiffreur de fichiers\n- Lecteur d\'archives\n- Accès aux dossiers');
          },
        },
        {
          id: 'disjoncteur',
          x: 70,
          y: 40,
          width: 3,
          height: 4,
          label: 'Tableau de disjoncteurs',
          action: () => setDisjoncteurOpen(true),
        },
        {
          id: 'serveur',
          x: 45,
          y: 60,
          width: 3,
          height: 3,
          label: 'Serveur de données',
          action: () => {
            if (!disjoncteurResolu) {
              showModal('🖥️ SERVEUR DE DONNÉES\n\n❌ Pas d\'alimentation électrique !\n\nVous devez d\'abord réparer le disjoncteur pour accéder aux serveurs.');
              return;
            }
            addToInventory('Code [1]');
            showModal('🖥️ SERVEUR DE DONNÉES\n\n✅ Alimentation rétablie !\nFichiers d\'archives accessibles\nRapports de laboratoire disponibles\n\n✅ Code partiel trouvé : [1]');
          },
        },
      ],
    },
    {
      id: 3,
      name: 'Salle Laboratoire',
      imageSrc: '/images/national-cancer-institute-NaqHdUS5mno-unsplash.jpg',
      description: 'Laboratoire de recherche. Des éprouvettes et des rapports scientifiques jonchent les tables.',
    hotspots: [
      {
          id: 'rapports',
        x: 20,
          y: 45,
          width: 5,
          height: 4,
          label: 'Pile de rapports',
          action: () => showModal('📋 RAPPORTS DE RECHERCHE\n\nÉquations testées :\n- Équation A : ÉCHEC\n- Équation B : ÉCHEC\n- Équation C : SUCCÈS ✅\n\nDossier correspondant : "Équation_C_Succès"'),
        },
        {
          id: 'chimie',
          x: 60,
          y: 30,
          width: 4,
          height: 5,
          label: 'Station de chimie',
          action: () => showModal('🧪 STATION DE CHIMIE\n\nProduits disponibles :\n- Acide chlorhydrique\n- Hydroxyde de sodium\n- Eau distillée\n\nMélange requis pour faire fondre la serrure !'),
        },
        {
          id: 'equation',
        x: 75,
          y: 60,
          width: 3,
          height: 3,
          label: 'Tableau d\'équations',
          action: () => {
            addToInventory('Code [2]');
            showModal('🧮 ÉQUATION VALIDE\n\nH₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O\n\nValeurs : H=1, S=16, O=8, Na=11\n\n✅ Code partiel trouvé : [2]');
          },
        },
      ],
    },
    {
      id: 4,
      name: 'Salle Archives',
      imageSrc: '/images/marissa-lewis-Fm17vn1lmAQ-unsplash.jpg',
      description: 'Archives poussiéreuses. Des dossiers et des documents anciens sont empilés partout.',
      hotspots: [
        {
          id: 'dossier_equation',
          x: 25,
          y: 40,
        width: 20,
          height: 15,
          label: 'Dossier "Équation_C_Succès"',
          action: () => showModal('📁 DOSSIER ÉQUATION\n\nFichier de sauvegarde : "equation_backup.txt"\nAccès via salle serveur\n\nContient les détails de l\'équation réussie !'),
        },
        {
          id: 'produits_chimiques',
          x: 60,
          y: 35,
          width: 18,
          height: 20,
          label: 'Dossier "Produits chimiques"',
          action: () => showModal('🧪 DOSSIER PRODUITS CHIMIQUES\n\nProduits listés :\n- Acide sulfurique (corrosif)\n- Hydroxyde de sodium (piquant)\n- Eau distillée (inodore)\n\nParticipants : Dr. Smith, Dr. Johnson'),
        },
        {
          id: 'archives',
        x: 45,
        y: 65,
          width: 15,
          height: 12,
          label: 'Archives générales',
          action: () => {
            addToInventory('Code [3]');
            showModal('📚 ARCHIVES GÉNÉRALES\n\nDocuments de recherche\nRapports d\'expériences\n\n✅ Code partiel trouvé : [3]');
          },
        },
      ],
    },
    {
      id: 5,
      name: 'Salle Vestiaires',
      imageSrc: '/images/eder-pozo-perez-kULiKsPCzIc-unsplash.jpg',
      description: 'Vestiaires abandonnés. Des blouses de laboratoire tachées traînent sur les bancs.',
      hotspots: [
        {
          id: 'blouses',
          x: 30,
          y: 45,
          width: 5,
          height: 4,
          label: 'Blouses tachées',
          action: () => showModal('👕 BLOUSES DE LABORATOIRE\n\nBlouse A : Taches bleues (Dr. Smith)\nBlouse B : Taches rouges (Dr. Johnson)\nBlouse C : Taches vertes (Dr. Wilson)\n\nLes couleurs correspondent aux produits chimiques !'),
        },
        {
          id: 'casiers',
          x: 65,
          y: 30,
          width: 4,
          height: 5,
          label: 'Casiers numérotés',
          action: () => setCasierOpen(true),
        },
        {
          id: 'indice_mur',
          x: 15,
          y: 25,
        width: 15,
        height: 10,
          label: 'Indice sur le mur',
          action: () => showModal('💡 INDICE CASIER\n\n"2 chiffres pairs, 1 chiffre impair\nNe contient pas le chiffre 4"\n\nExemples : 268, 682, 826...'),
        },
      ],
    },
    {
      id: 6,
      name: 'Salle Administrateur',
      imageSrc: '/images/a-friend-NZYbv1ftbmg-unsplash.jpg',
      description: 'Bureau de l\'administrateur. Une porte verrouillée par 3 jauges attend.',
      hotspots: [
        {
          id: 'jauges',
          x: 40,
          y: 35,
          width: 6,
          height: 5,
          label: 'Serrure à 3 jauges',
          action: () => {
            if (inventory.length < 3) {
              showModal('🔐 SERRURE À 3 JAUGES\n\n❌ Codes insuffisants !\n\nVous devez d\'abord collecter au moins 3 codes dans les autres salles.');
              return;
            }
            showModal('🔐 SERRURE À 3 JAUGES\n\n✅ Codes suffisants détectés !\n\nJauge 1 : H (Hydrogène) = 1\nJauge 2 : S (Soufre) = 16\nJauge 3 : O (Oxygène) = 8\n\nRéglez les valeurs selon l\'équation trouvée !\n\n🎉 Accès administrateur obtenu !');
            setAccesAdmin(true);
          },
        },
        {
          id: 'tiroir',
          x: 20,
          y: 60,
          width: 2,
          height: 3,
          label: 'Tiroir verrouillé',
          action: () => {
            if (!inventory.includes('Code [4]')) {
              showModal('🗄️ TIROIR VERROUILLÉ\n\n❌ Clé du casier requise !\n\nVous devez d\'abord résoudre l\'énigme des casiers dans la salle vestiaires.');
              return;
            }
            showModal('🗄️ TIROIR OUVERT !\n\n✅ Clé du casier trouvée !\n\nContient des documents importants sur la souche génétique !');
          },
        },
        {
          id: 'bureau',
          x: 70,
          y: 50,
          width: 15,
          height: 12,
          label: 'Bureau de l\'admin',
          action: () => showModal('🖥️ BUREAU ADMINISTRATEUR\n\nAccès aux fichiers système\nOutils de déchiffrage avancés\n\nCode final requis pour le coffre-fort !'),
      },
    ],
  },
];

  const currentRoom = rooms[currentRoomIndex];

  // Mise à jour du temps de blocage en temps réel
  useEffect(() => {
    if (!blockedUntil) return;

    const interval = setInterval(() => {
      if (new Date() >= blockedUntil) {
        setBlockedUntil(undefined);
        setAttempts(0);
        setAccessError('');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [blockedUntil]);

  // Gestion des événements Socket.io
  useEffect(() => {
    if (!socket) return;

    const socketInstance = socket as any;

    socketInstance.on('gameState', (state: any) => {
      setTimeLeft(state.timeLeft);
      setInventory(state.inventory);
      setDisjoncteurResolu(state.disjoncteurResolu);
      setAccesAdmin(state.accesAdmin);
      setGameStarted(state.gameStarted);
      setGameEnded(state.gameEnded);
    });

    socketInstance.on('playersList', (playersList: any) => {
      setPlayers(playersList);
    });

    socketInstance.on('chatMessage', (message: any) => {
      setChatMessages(prev => [...prev, message]);
    });

    socketInstance.on('playerJoined', (player: any) => {
      console.log('Nouveau joueur:', player.name);
    });

    socketInstance.on('playerLeft', (playerId: any) => {
      console.log('Joueur parti:', playerId);
    });

    return () => {
      socketInstance.off('gameState');
      socketInstance.off('playersList');
      socketInstance.off('chatMessage');
      socketInstance.off('playerJoined');
      socketInstance.off('playerLeft');
    };
  }, [socket]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const showModal = (content: string) => {
    setModalContent(content);
    setModalOpen(true);
  };

  // Fonction startGame supprimée - le jeu démarre automatiquement après le code

  const handleNavigateLeft = () => {
    if (currentRoomIndex > 0) {
      const newIndex = currentRoomIndex - 1;
      setCurrentRoomIndex(newIndex);
      // Réinitialiser le chat pour la nouvelle salle
      setChatMessages([]);
      // Émettre le changement de pièce
      if (socket) {
        (socket as any).emit('playerMove', { room: rooms[newIndex].name });
      }
    }
  };

  const handleNavigateRight = () => {
    if (currentRoomIndex < rooms.length - 1) {
      const newIndex = currentRoomIndex + 1;
      setCurrentRoomIndex(newIndex);
      // Réinitialiser le chat pour la nouvelle salle
      setChatMessages([]);
      // Émettre le changement de pièce
      if (socket) {
        (socket as any).emit('playerMove', { room: rooms[newIndex].name });
      }
    }
  };

  const addToInventory = (item: string) => {
    if (!inventory.includes(item)) {
      setInventory(prev => [...prev, item]);
      if (socket) {
        (socket as any).emit('addToInventory', item);
      }
    }
  };

  const handleAccessCode = () => {
    // Vérifier si l'utilisateur est encore bloqué
    if (blockedUntil && new Date() < blockedUntil) {
      const remainingTime = Math.ceil((blockedUntil.getTime() - new Date().getTime()) / 1000);
      setAccessError(`🔒 Accès bloqué ! Réessayez dans ${remainingTime} secondes.`);
      return;
    }

    // Si le blocage est terminé, le réinitialiser
    if (blockedUntil && new Date() >= blockedUntil) {
      setBlockedUntil(undefined);
      setAttempts(0);
    }

    if (accessCode === '1234') {
      setAccessGranted(true);
      setGameStarted(true);
      setTimeLeft(60 * 60); // Réinitialiser le timer à 60 minutes
      setInventory([]); // Réinitialiser l'inventaire
      setGameEnded(false); // Réinitialiser l'état de fin
      setDisjoncteurResolu(false); // Réinitialiser les états
      setAccesAdmin(false);
      setAccessError('');
      setAttempts(0); // Réinitialiser les tentatives
      setBlockedUntil(undefined); // Réinitialiser le blocage
    } else {
      setAttempts(prev => prev + 1);
      if (attempts >= 2) {
        const blockTime = new Date();
        blockTime.setMinutes(blockTime.getMinutes() + 1); // Bloquer pendant 1 minute
        setBlockedUntil(blockTime);
        setAccessError('⚠️ Trop de tentatives ! Accès bloqué pendant 1 minute.');
      } else {
        setAccessError(`Code d'accès incorrect. Tentatives restantes : ${3 - attempts - 1}`);
      }
      setAccessCode('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAccessCode();
    }
  };

  // Écran de code d'accès
  if (!accessGranted) {
    return (
      <main className="h-screen w-screen bg-gradient-to-br from-gray-900 via-red-900 to-black flex items-center justify-center">
        <div className="text-center text-white max-w-2xl mx-auto px-8">
          <h1 className="text-6xl font-bold mb-6 text-red-400">TCHERNOBYL2</h1>
          <h2 className="text-2xl mb-8 text-gray-300">Accès Restreint - Mission Classifiée</h2>
          
          <div className="bg-black bg-opacity-50 p-8 rounded-lg mb-8">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">🔐 ACCÈS SÉCURISÉ</h3>
            
            {/* Timer d'urgence */}
            <div className="bg-red-900 bg-opacity-70 p-4 rounded-lg mb-6 border-l-4 border-red-500">
              <div className="flex items-center justify-center gap-4">
                <div className="text-3xl">⏰</div>
                <div className="text-2xl font-bold text-red-300">{formatTime(timeLeft)}</div>
              </div>
              <div className="text-center text-red-200 text-sm mt-2">
                ⚠️ TEMPS LIMITÉ - Radioactivité en cours !
              </div>
            </div>
            
            <p className="text-lg mb-6">
              <strong>2119</strong> - Installation Tchernobyl2<br/>
              <strong>Classification :</strong> ULTRA SECRET<br/>
              <strong>Accès :</strong> Personnel autorisé uniquement
            </p>
            
            <div className="bg-red-900 bg-opacity-50 p-4 rounded border-l-4 border-red-500 mb-6">
              <p className="text-red-200 font-bold">⚠️ ATTENTION : Zone de haute sécurité</p>
              <p className="text-red-200 text-sm">Radioactivité détectée - Accès limité à 60 minutes</p>
            </div>
            
            {/* Messages d'urgence selon le temps restant */}
            {timeLeft < 300 && (
              <div className="bg-red-800 bg-opacity-70 p-3 rounded border-l-4 border-red-600 mb-4">
                <p className="text-red-300 font-bold animate-pulse">
                  🚨 URGENCE ! Moins de 5 minutes avant l'explosion !
                </p>
              </div>
            )}
            {timeLeft < 60 && (
              <div className="bg-red-900 bg-opacity-80 p-3 rounded border-l-4 border-red-700 mb-4">
                <p className="text-red-400 font-bold animate-pulse" style={{animationDuration: '0.8s'}}>
                  💀 CRITIQUE ! Moins d'1 minute !
                </p>
              </div>
            )}
            {timeLeft < 10 && (
              <div className="bg-red-950 bg-opacity-90 p-3 rounded border-l-4 border-red-800 mb-4">
                <p className="text-red-500 font-bold animate-pulse" style={{animationDuration: '0.4s'}}>
                  ⚡ EXPLOSION IMMINENTE !
                </p>
              </div>
            )}
            {timeLeft === 0 && (
              <div className="bg-black bg-opacity-90 p-3 rounded border-l-4 border-red-900 mb-4">
                <p className="text-red-600 font-bold animate-pulse" style={{animationDuration: '0.2s'}}>
                  💥 MISSION ÉCHOUÉE - EXPLOSION !
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Code d'accès requis :
                </label>
                <input
                  type="password"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Entrez le code d'accès"
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none text-center text-xl tracking-widest"
                  maxLength={4}
                />
              </div>
              
              {accessError && (
                <div className="text-red-400 text-sm animate-pulse">
                  ❌ {accessError}
                </div>
              )}
              
              {attempts > 0 && (
                <div className="text-yellow-400 text-xs">
                  🔒 Tentatives : {attempts}/3
                </div>
              )}
              
              <button
                onClick={handleAccessCode}
                disabled={blockedUntil && new Date() < blockedUntil}
                className={`font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200 w-full ${
                  blockedUntil && new Date() < blockedUntil
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-700 text-white hover:scale-105'
                }`}
              >
                {blockedUntil && new Date() < blockedUntil 
                  ? `🔒 BLOQUÉ (${Math.ceil((blockedUntil.getTime() - new Date().getTime()) / 1000)}s)`
                  : 'ACCÉDER À LA MISSION'
                }
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Écran de fin de jeu
  if (gameEnded) {
    return (
      <main className="h-screen w-screen bg-gradient-to-br from-black via-red-950 to-black flex items-center justify-center">
        <div className="text-center text-white mx-auto px-8">
          <h1 className="text-6xl font-bold text-red-600">VOUS ÊTES CONTAMINÉ</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen w-screen overflow-hidden relative">
      <Room
        imageSrc={currentRoom.imageSrc}
        hotspots={currentRoom.hotspots}
        onNavigateLeft={currentRoomIndex > 0 ? handleNavigateLeft : undefined}
        onNavigateRight={currentRoomIndex < rooms.length - 1 ? handleNavigateRight : undefined}
        showLeftArrow={currentRoomIndex > 0}
        showRightArrow={currentRoomIndex < rooms.length - 1}
      />
      
      {/* Interface de jeu */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-80 text-white p-4 rounded-lg">
        <div className="flex items-center gap-4 mb-2">
          <div className="text-2xl">⏰</div>
          <div className="text-xl font-bold text-red-400">{formatTime(timeLeft)}</div>
        </div>
        
        {/* Messages d'urgence sous le timer */}
        {timeLeft < 300 && timeLeft >= 60 && (
          <div className="text-xs text-red-400 font-bold animate-pulse">
            ⚠️ URGENCE ! Moins de 5 minutes !
          </div>
        )}
        {timeLeft < 60 && timeLeft >= 10 && (
          <div className="text-xs text-red-600 font-bold animate-bounce">
            🚨 CRITIQUE ! Moins d'1 minute !
          </div>
        )}
        {timeLeft < 10 && timeLeft >= 3 && (
          <div className="text-xs text-red-800 font-bold animate-ping">
            💀 DERNIÈRES SECONDES !
          </div>
        )}
        {timeLeft < 3 && timeLeft > 0 && (
          <div className="text-xs text-red-900 font-bold animate-spin">
            ⚡ EXPLOSION IMMINENTE !
          </div>
        )}
        {timeLeft === 0 && (
          <div className="text-xs text-red-950 font-bold animate-pulse">
            💥 MISSION ÉCHOUÉE !
          </div>
        )}
      </div>

      {/* Inventaire */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg max-w-xs">
        <div className="text-lg font-bold mb-2">🎒 INVENTAIRE</div>
        {inventory.length === 0 ? (
          <div className="text-sm text-gray-400">Aucun objet collecté</div>
        ) : (
          <div className="space-y-1">
            {inventory.map((item, index) => (
              <div key={index} className="text-sm bg-green-600 bg-opacity-30 px-2 py-1 rounded">
                {item}
              </div>
            ))}
          </div>
        )}
      </div>


      {/* Joueurs présents dans la pièce */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-80 text-white p-3 rounded-lg">
        <div className="text-sm font-bold mb-2">👥 {currentRoom.name}</div>
        <div className="text-xs space-y-1">
          {players.filter(player => player.room === currentRoom.name).length === 0 ? (
            <div className="text-gray-400">Vous êtes seul ici</div>
          ) : (
            players
              .filter(player => player.room === currentRoom.name)
              .map((player, index) => (
                <div key={player.id} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    index === 0 ? 'bg-green-500' : 
                    index === 1 ? 'bg-blue-500' : 
                    index === 2 ? 'bg-yellow-500' : 'bg-purple-500'
                  }`}></div>
                  <span className="text-gray-300">{player.name}</span>
                </div>
              ))
          )}
        </div>
      </div>


      {/* Système de chat avec aide intégrée */}
      <ChatSystem
        currentRoom={currentRoom.name}
        isOpen={chatOpen}
        onToggle={() => setChatOpen(!chatOpen)}
        messages={chatMessages}
        onSendMessage={(message) => {
          if (socket) {
            (socket as any).emit('chatMessage', message);
          }
        }}
        helpMessages={helpMessages}
        timeLeft={timeLeft}
        totalHelpUsed={totalHelpUsed}
        maxHelpAllowed={5}
        onSendHelpMessage={(message) => {
          // Vérifier si on peut encore utiliser l'aide
          if (totalHelpUsed < 5) {
            // Ajouter uniquement à l'historique d'aide de la salle (pas d'envoi dans le chat)
            setHelpMessages(prev => ({
              ...prev,
              [currentRoom.name]: [...(prev[currentRoom.name] || []), message]
            }));
            // Incrémenter le compteur d'aide utilisée
            setTotalHelpUsed(prev => prev + 1);
          }
        }}
      />

      {/* Énigmes interactives */}
      <DisjoncteurPuzzle
        isOpen={disjoncteurOpen}
        onClose={() => setDisjoncteurOpen(false)}
        onSuccess={() => {
          setDisjoncteurResolu(true);
          showModal('⚡ COURANT RÉTABLI !\n\nLe disjoncteur fonctionne à nouveau !\nVous pouvez maintenant accéder aux ordinateurs !');
          setDisjoncteurOpen(false);
        }}
      />

      <CasierPuzzle
        isOpen={casierOpen}
        onClose={() => setCasierOpen(false)}
        onSuccess={() => {
          addToInventory('Code [4]');
          showModal('🔐 CASIER OUVERT !\n\n✅ Code partiel trouvé : [4]\n\nVous avez trouvé la clé du casier !');
          setCasierOpen(false);
        }}
      />

      {/* Modal pour les messages d'information */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-base-300 rounded-lg shadow-2xl max-w-2xl w-full mx-4 p-6">
            <h3 className="font-bold text-lg mb-4 text-base-content">Information</h3>
            <div className="whitespace-pre-line text-base-content mb-6">
              {modalContent}
            </div>
            <div className="flex justify-end">
              <button 
                className="btn btn-primary"
                onClick={() => setModalOpen(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}