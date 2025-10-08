import { Room } from "../RoomsData";

export const createSalleVestiaires = (
  setCurrentRoomIndex: (index: number) => void,
  setChatMessages: (messages: any[]) => void,
  socket: any,
  showModal: (content: string) => void
): Room => ({
  id: 5,
  name: "Salle Vestiaires",
  imageSrc: "/images/vestiaire.png",
  description:
    "Vestiaires abandonnés. Des blouses de laboratoire tachées traînent sur les bancs.",
  hotspots: [
    {
      id: "blouses",
      x: 30,
      y: 45,
      width: 5,
      height: 4,
      label: "Blouses tachées",
      action: () =>
        showModal(
          "👕 BLOUSES DE LABORATOIRE\n\nBlouse A : Taches bleues (Dr. Smith)\nBlouse B : Taches rouges (Dr. Johnson)\nBlouse C : Taches vertes (Dr. Wilson)\n\nLes couleurs correspondent aux produits chimiques !"
        ),
    },
    {
      id: "casiers",
      x: 65,
      y: 30,
      width: 4,
      height: 5,
      label: "Casiers numérotés",
      action: () => showModal("Le casier est ouvert ! Vous trouvez une clé de laboratoire."),
    },
    {
      id: "indice_mur",
      x: 15,
      y: 25,
      width: 15,
      height: 10,
      label: "Indice sur le mur",
      action: () =>
        showModal(
          '💡 INDICE CASIER\n\n"2 chiffres pairs, 1 chiffre impair\nNe contient pas le chiffre 4"\n\nExemples : 268, 682, 826...'
        ),
    },
    {
      id: "retour_hall",
      x: 5,
      y: 5,
      width: 8,
      height: 12,
      label: "🚪 Retour au Hall Principal",
      action: () => {
        setCurrentRoomIndex(0);
        setChatMessages([]);
        if (socket) {
          socket.emit("playerMove", { room: "Entrée - Hall Principal" });
        }
      },
    },
  ],
});
