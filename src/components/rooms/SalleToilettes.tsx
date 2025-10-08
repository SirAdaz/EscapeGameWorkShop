import { Room } from "../RoomsData";

export const createSalleToilettes = (): Room => ({
    id: 7,
    name: "Salle Toilettes",
    imageSrc: "/images/toilettes.jpg",
    description:
      "Toilettes abandonnées. L'odeur de désinfectant se mêle à celle de l'humidité.",
    hotspots: [],
  });
