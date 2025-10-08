import { Room } from "../RoomsData";

export const createSalleServeur = (
  setCurrentRoomIndex: (index: number) => void,
  setChatMessages: (messages: any[]) => void,
  socket: any,
  showModal: (content: string) => void,
  setDisjoncteurOpen: (open: boolean) => void,
  addToInventory: (item: string) => void,
  disjoncteurResolu: boolean,
  accesAdmin: boolean
): Room => ({
  id: 2,
  name: "Salle Serveur",
  imageSrc: "/images/serveur.png",
  description:
    "Salle des serveurs informatiques. Des ordinateurs clignotent dans l'obscurité.",
  hotspots: [
    {
      id: "pc",
      x: 25,
      y: 35,
      width: 4,
      height: 5,
      label: "Ordinateur principal",
      action: () => {
        if (!disjoncteurResolu) {
          showModal(
            "💻 ORDINATEUR PRINCIPAL\n\n❌ Pas d'alimentation électrique !\n\nVous devez d'abord réparer le disjoncteur."
          );
          return;
        }
        if (!accesAdmin) {
          showModal(
            "💻 ORDINATEUR PRINCIPAL\n\n❌ Accès administrateur requis !\n\nVous devez d'abord obtenir les droits d'accès dans la salle administrateur."
          );
          return;
        }
        showModal(
          "💻 ORDINATEUR PRINCIPAL\n\n✅ Accès administrateur confirmé !\n\nOutils disponibles :\n- Déchiffreur de fichiers\n- Lecteur d'archives\n- Accès aux dossiers"
        );
      },
    },
    {
      id: "disjoncteur",
      x: 70,
      y: 40,
      width: 3,
      height: 4,
      label: "Tableau de disjoncteurs",
      action: () => setDisjoncteurOpen(true),
    },
    {
      id: "serveur",
      x: 45,
      y: 60,
      width: 3,
      height: 3,
      label: "Serveur de données",
      action: () => {
        if (!disjoncteurResolu) {
          showModal(
            "🖥️ SERVEUR DE DONNÉES\n\n❌ Pas d'alimentation électrique !\n\nVous devez d'abord réparer le disjoncteur pour accéder aux serveurs."
          );
          return;
        }
        addToInventory("Code [1]");
        showModal(
          "🖥️ SERVEUR DE DONNÉES\n\n✅ Alimentation rétablie !\nFichiers d'archives accessibles\nRapports de laboratoire disponibles\n\n✅ Code partiel trouvé : [1]"
        );
      },
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
