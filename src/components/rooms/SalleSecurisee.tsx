import { Room } from "../RoomsData";

export const createSalleSecurisee = (
  setCurrentRoomIndex: (index: number) => void,
  setChatMessages: (messages: any[]) => void,
  socket: any,
  showModal: (content: string) => void,
  setAccesAdmin: (admin: boolean) => void,
  inventory: string[]
): Room => ({
  id: 6,
  name: "Salle Sécurisée",
  imageSrc: "/images/salleSecurise.png",
  description:
    "Bureau de l'administrateur. Une porte verrouillée par 3 jauges attend.",
  hotspots: [
    {
      id: "jauges",
      x: 40,
      y: 35,
      width: 6,
      height: 5,
      label: "Serrure à 3 jauges",
      action: () => {
        if (inventory.length < 3) {
          showModal(
            "🔐 SERRURE À 3 JAUGES\n\n❌ Codes insuffisants !\n\nVous devez d'abord collecter au moins 3 codes dans les autres salles."
          );
          return;
        }
        showModal(
          "🔐 SERRURE À 3 JAUGES\n\n✅ Codes suffisants détectés !\n\nJauge 1 : H (Hydrogène) = 1\nJauge 2 : S (Soufre) = 16\nJauge 3 : O (Oxygène) = 8\n\nRéglez les valeurs selon l'équation trouvée !\n\n🎉 Accès administrateur obtenu !"
        );
        setAccesAdmin(true);
      },
    },
    {
      id: "tiroir",
      x: 20,
      y: 60,
      width: 2,
      height: 3,
      label: "Tiroir verrouillé",
      action: () => {
        if (!inventory.includes("Code [4]")) {
          showModal(
            "🗄️ TIROIR VERROUILLÉ\n\n❌ Clé du casier requise !\n\nVous devez d'abord résoudre l'énigme des casiers dans la salle vestiaires."
          );
          return;
        }
        showModal(
          "🗄️ TIROIR OUVERT !\n\n✅ Clé du casier trouvée !\n\nContient des documents importants sur la souche génétique !"
        );
      },
    },
    {
      id: "bureau",
      x: 70,
      y: 50,
      width: 15,
      height: 12,
      label: "Bureau de l'admin",
      action: () =>
        showModal(
          "🖥️ BUREAU ADMINISTRATEUR\n\nAccès aux fichiers système\nOutils de déchiffrage avancés\n\nCode final requis pour le coffre-fort !"
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
