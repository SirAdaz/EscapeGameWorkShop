import { Room } from "../RoomsData";

export const createSalleVestiaires = (
  setCurrentRoomIndex: (index: number) => void,
  setChatMessages: (messages: any[]) => void,
  socket: any,
  showModal: (content: string) => void,
  addToInventory: (item: string) => void,
  setCasiersResolu: (val: boolean) => void,
  casiersResolu: boolean,
  casiersProgress: { current: number; total: number },
  setCasiersProgress: (progress: { current: number; total: number }) => void,
  currentCasierNumber: string | null,
  setCurrentCasierNumber: (number: string | null) => void
): Room => {
  // Séquence des casiers
  const sequence = ["243", "331", "206", "742", "123"];
  
  // Fonction pour vérifier si le casier cliqué est correct
  const checkCasier = (casierId: string) => {
    if (casiersResolu) return true;
    
    const casierNumber = casierId.replace("casiers", "");
    const expectedNumber = sequence[casiersProgress.current];
    
    if (casierNumber === expectedNumber) {
      const newProgress = casiersProgress.current + 1;
      setCasiersProgress({ current: newProgress, total: sequence.length });
      
      if (newProgress >= sequence.length) {
        // Séquence complète
        setCasiersResolu(true);
        addToInventory("clef");
        if (socket) socket.emit("setCasiersResolu", true);
        setCurrentCasierNumber(null);
      } else {
        // Prochain casier
        setCurrentCasierNumber(sequence[newProgress]);
      }
      return true;
    } else {
      // Mauvaise séquence, réinitialiser
      setCasiersProgress({ current: 0, total: sequence.length });
      setCurrentCasierNumber(sequence[0]);
      console.log("Séquence réinitialisée - mauvais casier cliqué");
      return false;
    }
  };

  return {
  id: 5,
  name: "Salle Vestiaires",
  imageSrc: "/images/vestiaire.png",
  description:
    "Vestiaires abandonnés. Des blouses de laboratoire tachées traînent sur les bancs.",
  hotspots: [
    {
      id: "casiers243",
      x: 64,
      y: 33,
      width: 3,
      height: 20,
      label: "Casiers numérotés 243",
      action: () => {
        checkCasier("casiers243");
        showModal("Casiers");
      }
    },
    {
      id: "casiers331",
      x: 23,
      y: 28,
      width: 4,
      height: 25,
      label: "Casiers numérotés 331",
      action: () => {
        checkCasier("casiers331");
        showModal("Casiers");
      }
    },
    {
      id: "casiers206",
      x: 58,
      y: 37,
      width: 2,
      height: 15,
      label: "Casiers numérotés 206",
      action: () => {
        checkCasier("casiers206");
        showModal("Casiers");
      }
    },
    {
      id: "casiers742",
      x: 83,
      y: 20,
      width: 7,
      height: 35,
      label: "Casiers numérotés 742",
      action: () => {
        checkCasier("casiers742");
        showModal("Casiers");
      }
    },
    {
      id: "casiers123",
      x: 54.5,
      y: 40,
      width: 2,
      height: 13,
      label: "Casiers numérotés 123",
      action: () => {
        checkCasier("casiers123");
        showModal("Casiers");
      }
    },
    {
      id: "FauxCasier1",
      x: 48,
      y: 40,
      width: 3,
      height: 13,
      label: "Faux Casier 1",
      action: () => {
        showModal("FauxCasier");
      }
    },
    {
      id: "FauxCasier2",
      x: 45.5,
      y: 40,
      width: 3,
      height: 13,
      label: "Faux Casier 2",
      action: () => {
        showModal("FauxCasier");
      }
    },
    {
      id: "FauxCasier3",
      x: 42,
      y: 40,
      width: 3,
      height: 13,
      label: "Faux Casier 3",
      action: () => {
        showModal("FauxCasier");
      }
    },
    {
      id: "FauxCasier4",
      x: 38.5,
      y: 40,
      width: 3,
      height: 13,
      label: "Faux Casier 4",
      action: () => {
        showModal("FauxCasier");
      }
    },
    {
      id: "FauxCasier5",
      x: 35,
      y: 40,
      width: 3,
      height: 13,
      label: "Faux Casier 5",
      action: () => {
        showModal("FauxCasier");
      }
    },
    {
      id: "FauxCasier6",
      x: 68,
      y: 33,
      width: 3,
      height: 20,
      label: "Faux Casier 6",
      action: () => {
        showModal("FauxCasier");
      }
    },
    {
      id: "FauxCasier7",
      x: 72,
      y: 29,
      width: 4,
      height: 26,
      label: "Faux Casier 7",
      action: () => {
        showModal("FauxCasier");
      }
    },
    {
      id: "FauxCasier8",
      x: 77,
      y: 25,
      width: 4,
      height: 30,
      label: "Faux Casier 8",
      action: () => {
        showModal("FauxCasier");
      }
    },
    {
      id: "FauxCasier9",
      x: 83,
      y: 22,
      width: 6,
      height: 33,
      label: "Faux Casier 9",
      action: () => {
        showModal("FauxCasier");
      }
    },
    {
      id: "FauxCasier10",
      x: 62,
      y: 35,
      width: 2,
      height: 18, 
      label: "Faux Casier 10",
      action: () => {
        showModal("FauxCasier");
      }
    },
    {
      id: "FauxCasier11",
      x: 28,
      y: 30,
      width: 2,
      height: 25,
      label: "Faux Casier 11",
      action: () => {
        checkCasier("casiers331");
        showModal("FauxCasier");
      }
    },
    {
      id: "FauxCasier12",
      x: 18,
      y: 25,
      width: 5,
      height: 30,
      label: "Faux Casier 12",
      action: () => {
        showModal("FauxCasier");
      }
    },
    {
      id: "FauxCasier13",
      x: 11,
      y: 20,
      width: 6,
      height: 35,
      label: "Faux Casier 13",
      action: () => {
        showModal("FauxCasier");
      }
    },
  ],
  };
};
