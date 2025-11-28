interface LineChartInfo {
  id: string;
  title: string;
  decription: string;
  thumbnail: string;
}

export const LineChartInfo = {
  id: "LineChart", // <-- C'est ton chartId
  title: "Evolution du nombre de tournage par année 🔝",
  description:
    "Ce graphique représente l'évolution du nombre de tournage réalisée à Paris en fonction des années. De 2026 à 2024.",
  thumbnail: "../public/picLineChart.png",
};

export const TopDirectorsInfo = {
  id: "TopDirectors", // <-- C'est ton chartId
  title: "Top 10 Réalisateurs/Réalisatrices à Paris",
  description: "Les réalisateurs avec le plus de tournages enregistrés",
  thumbnail: "../public/picTopDirectors.png",
};

export const ShootingTypeChartInfo = {
  id: "ShootingTypeChart", // <-- C'est ton chartId
  title: "Répartition par type de tournage",
  description:
    "Distribution des tournages selon leur type (long métrage, série, téléfilm, etc.)",
  thumbnail: "../public/picShootingTypeChart.png",
};

export const TypesByYearChartInfo = {
  id: "TypesByYearChart",
  title: "Types × Année",
  description:
    "Distribution des types de tournage par année (5 types principaux + Autres)",
  thumbnail: "../public/picTypesByYearChart.png",
export const SimpleBarChartInfo = {
  id: "SimpleBarChart", // <-- C'est ton chartId
  title: "Répartition du nombre de tournage par arrondissement 🌀",
  description:
    "Ce graphique montre le nombre de tournages réalisés dans chaque arrondissement de Paris. Il permet d’identifier en un coup d’œil les zones où les tournages sont les plus fréquents.",
  thumbnail: "../public/picSimpleBarChart.png",
};
