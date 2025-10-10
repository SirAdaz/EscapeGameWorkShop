'use client';
import { create } from 'zustand';

interface GameState {
  // --- États de base du jeu ---
  currentRoomIndex: number;
  setCurrentRoomIndex: (index: number) => void;

  timeLeft: number;
  setTimeLeft: (time: number) => void;

  inventory: string[];
  setInventory: (inv: string[]) => void;

  gameEnded: boolean;
  setGameEnded: (val: boolean) => void;

  gameWon: boolean;
  setGameWon: (val: boolean) => void;

  accessGranted: boolean;
  setAccessGranted: (val: boolean) => void;

  // --- États des puzzles ---
  disjoncteurResolu: boolean;
  setDisjoncteurResolu: (val: boolean) => void;

  casiersResolu: boolean;
  setCasiersResolu: (val: boolean) => void;

  casiersProgress: { current: number; total: number };
  setCasiersProgress: (progress: { current: number; total: number }) => void;

  currentCasierNumber: string | null;
  setCurrentCasierNumber: (number: string | null) => void;

  accesAdmin: boolean;
  setAccesAdmin: (val: boolean) => void;

  jaugesResolues: boolean;
  setJaugesResolues: (val:boolean) => void;

  // --- Solutions des énigmes ---
  codeEquationRu: number;
  codeEquationS: number;
  codeEquationU: number;

  // --- Obtention des codes pour porte sécurisée ---
  codeLaboObtenu: boolean;
  setCodeLaboObtenu: (val:boolean) => void;

  codeGeneralObtenu: boolean;
  setCodeGeneralObtenu: (val: boolean) => void;

  // --- États des joueurs et communication ---
  players: any[];
  setPlayers: (players: any[]) => void;

  chatMessages: any[];
  setChatMessages: (messages: any[] | ((prev: any[]) => any[])) => void;

  // --- États d'aide globale ---
  helpMessages: { [key: string]: string[] };
  setHelpMessages: (messages: { [key: string]: string[] }) => void;

  totalHelpUsed: number;
  setTotalHelpUsed: (val: number) => void;

  helpCooldown?: Date;
  setHelpCooldown: (val?: Date) => void;

  // --- États de l'interface ---
  modalOpen: boolean;
  setModalOpen: (val: boolean) => void;

  modalContent: string;
  setModalContent: (val: string) => void;

  initialHelpCooldown?: Date;
  setInitialHelpCooldown: (val?: Date) => void;

  // --- Fonctions utilitaires ---
  showModal: (content: string) => void;
  addToInventory: (item: string, socket?: any) => void;
  handleAccessGranted: (socket?: any) => void;
}

export const useGameState = create<GameState>((set, get) => ({
  // --- États de base du jeu ---
  currentRoomIndex: 0,
  setCurrentRoomIndex: (index) => set({ currentRoomIndex: index }),

  timeLeft: 60 * 60,
  setTimeLeft: (time) => set({ timeLeft: time }),

  inventory: [],
  setInventory: (inv) => set({ inventory: inv }),

  gameEnded: false,
  setGameEnded: (val) => set({ gameEnded: val }),

  gameWon: false,
  setGameWon: (val) => set({ gameWon: val }),

  accessGranted: false,
  setAccessGranted: (val) => set({ accessGranted: val }),

  // --- États des puzzles ---
  disjoncteurResolu: false,
  setDisjoncteurResolu: (val) => set({ disjoncteurResolu: val }),

  casiersResolu: false,
  setCasiersResolu: (val) => set({ casiersResolu: val }),

  casiersProgress: { current: 0, total: 5 },
  setCasiersProgress: (progress) => set({ casiersProgress: progress }),

  currentCasierNumber: "243",
  setCurrentCasierNumber: (number) => set({ currentCasierNumber: number }),

  accesAdmin: false,
  setAccesAdmin: (val) => set({ accesAdmin: val }),

  jaugesResolues: false,
  setJaugesResolues: (val) => set({ jaugesResolues: val }),

  // --- Solutions des énigmes ---
  codeEquationRu: 5,
  codeEquationS: 8,
  codeEquationU: 2,

  // --- Obtention des codes pour porte sécurisée ---
  codeLaboObtenu: false,
  setCodeLaboObtenu: (val) => set({ codeLaboObtenu: val}),

  codeGeneralObtenu: false,
  setCodeGeneralObtenu: (val) => set({ codeGeneralObtenu: val }),


  // --- États des joueurs et communication ---
  players: [],
  setPlayers: (players) => set({ players }),

  chatMessages: [],
  setChatMessages: (messages) => {
    if (typeof messages === 'function') {
      set((state) => ({ chatMessages: messages(state.chatMessages) }));
    } else {
      set({ chatMessages: messages });
    }
  },

  // --- États d'aide globale ---
  helpMessages: {},
  setHelpMessages: (messages) => set({ helpMessages: messages }),

  totalHelpUsed: 0,
  setTotalHelpUsed: (val) => set({ totalHelpUsed: val }),

  helpCooldown: undefined,
  setHelpCooldown: (val) => set({ helpCooldown: val }),

  // --- États de l'interface ---
  modalOpen: false,
  setModalOpen: (val) => set({ modalOpen: val }),

  modalContent: "",
  setModalContent: (val) => set({ modalContent: val }),

  initialHelpCooldown: undefined,
  setInitialHelpCooldown: (val) => set({ initialHelpCooldown: val }),

  // --- Fonctions utilitaires ---
  showModal: (content) => set({ modalOpen: true, modalContent: content }),

  addToInventory: (item, socket) => {
    const { inventory } = get();
    if (!inventory.includes(item)) {
      const newInventory = [...inventory, item];
      set({ inventory: newInventory });
      if (socket) {
        socket.emit("addToInventory", item);
      }
    }
  },

  handleAccessGranted: (socket) => {
    const initialCooldown = new Date();
    initialCooldown.setMinutes(initialCooldown.getMinutes() + 5);

    set({
      accessGranted: true,
      timeLeft: 60 * 60,
      inventory: [],
      gameEnded: false,
      disjoncteurResolu: false,
      jaugesResolues: false,
      casiersResolu: false,
      casiersProgress: { current: 0, total: 5 },
      currentCasierNumber: "243",
      accesAdmin: false,
      codeGeneralObtenu: false,
      initialHelpCooldown: initialCooldown,
    });

    if (socket) {
      socket.emit("helpMessage", {
        helpMessages: {},
        totalHelpUsed: 0,
        helpCooldown: initialCooldown.toISOString(),
      });
    }
  },
}));
