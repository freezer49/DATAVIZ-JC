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
