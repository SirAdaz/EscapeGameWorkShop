import { Room } from "../RoomsData";

export const createSalleServeur = (
  setCurrentRoomIndex: (index: number) => void,
  setChatMessages: (messages: any[]) => void,
  socket: any,
  showModal: (content: string) => void,
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
      x: 44,
      y: 49,
      width: 13,
      height: 20,
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
      x: 9,
      y: 29,
      width: 9,
      height: 37,
      label: "Tableau de disjoncteurs",
      action: () => showModal("disjoncteur"),
    },
    {
      id: "serveur",
      x: 80,
      y: 20,
      width: 18,
      height: 78,
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
  ],
});
