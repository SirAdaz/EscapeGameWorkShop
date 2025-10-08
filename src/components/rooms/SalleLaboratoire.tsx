import { Room } from "../RoomsData";

export const createSalleLaboratoire = (
  showModal: (content: string) => void,
  addToInventory: (item: string) => void
): Room => ({
  id: 3,
  name: "Salle Laboratoire",
  imageSrc: "/images/labo1.png",
  description:
    "Laboratoire de recherche. Des éprouvettes et des rapports scientifiques jonchent les tables.",
  hotspots: [
    {
      id: "chimie",
      x: 60,
      y: 30,
      width: 4,
      height: 5,
      label: "Station de chimie",
      action: () =>
        showModal(
          "🧪 STATION DE CHIMIE\n\nProduits disponibles :\n- Acide chlorhydrique\n- Hydroxyde de sodium\n- Eau distillée\n\nMélange requis pour faire fondre la serrure !"
        ),
    },
    {
      id: "equation",
      x: 75,
      y: 60,
      width: 3,
      height: 3,
      label: "Tableau d'équations",
      action: () => {
        addToInventory("Code [2]");
        showModal(
          "🧮 ÉQUATION VALIDE\n\nH₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O\n\nValeurs : H=1, S=16, O=8, Na=11\n\n✅ Code partiel trouvé : [2]"
        );
      },
    },
  ],
});
