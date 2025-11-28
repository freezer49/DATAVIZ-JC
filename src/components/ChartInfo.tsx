interface LineChartInfo {
  id: string;
  title: string;
  decription: string;
  thumbnail: string;
}

export const LineChartInfo = {
  id: "LineChart", // <-- C'est ton chartId
  title: "Evolution du nombre de tournage par année 🔝",
  previewDescription:
    "Ce graphique représente l'évolution du nombre de tournage réalisée à Paris en fonction des années. De 2026 à 2024.",
  analysisDescription:
    "Ce graphique affiche l'évolution du nombre de tournages à Paris année après année. Il permet de visualiser si l'activité cinématographique parisienne est en hausse, en baisse ou reste stable. On peut y identifier les pics d'activité, les creux, et comprendre comment des événements majeurs (crises, changements réglementaires) ont impacté la production cinématographique dans la capitale. l'évolution du nombre de tournages à Paris année après année. Il permet de visualiser si l'activité cinématographique parisienne est en hausse, en baisse ou reste stable. On peut y identifier les pics d'activité, les creux, et comprendre comment des événements majeurs (crises, changements réglementaires) ont impacté la production cinématographique dans la capitale.",
  thumbnail: "../public/picLineChart.png",
};

export const TopDirectorsInfo = {
  id: "TopDirectors", // <-- C'est ton chartId
  title: "Top 10 Réalisateurs/Réalisatrices à Paris",
  previewDescription: "Les réalisateurs avec le plus de tournages enregistrés",
  analysisDescription:
    "Ce graphique montre Ce graphique présente le classement des 10 réalisateurs et réalisatrices ayant réalisé le plus de tournages à Paris. Il permet de découvrir les talents les plus actifs de la capitale, leurs années d'activité, et les types de productions qu'ils/elles favorisent. On comprend ainsi qui sont les créateurs majeurs qui façonnent le paysage cinématographique parisien. répartition des Ce graphique présente le classement des 10 réalisateurs et réalisatrices ayant réalisé le plus de tournages à Paris. Il permet de découvrir les talents les plus actifs de la capitale, leurs années d'activité, et les types de productions qu'ils/elles favorisent. On comprend ainsi qui sont les créateurs majeurs qui façonnent le paysage cinématographique parisien. selon leur type : longs métrages, séries TV, séries web, téléfilms, documentaires, etc. Il permet de comprendre quel format de production domine à Paris et de comparer les volumes entre les différentes catégories. On voit immédiatement si les longs métrages restent le format dominant ou si les séries gagnent du terrain.",
  thumbnail: "../public/picTopDirectors.png",
};

export const ShootingTypeChartInfo = {
  id: "ShootingTypeChart", // <-- C'est ton chartId
  title: "Répartition par type de tournage",
  previewDescription:
    "Distribution des tournages selon leur type (long métrage, série, téléfilm, etc.)",
  analysisDescription:
    "Ce graphique montre Ce graphique montre la répartition des tournages selon leur type : longs métrages, séries TV, séries web, téléfilms, documentaires, etc. Il permet de comprendre quel format de production domine à Paris et de comparer les volumes entre les différentes catégories. On voit immédiatement si les longs métrages restent le format dominant ou si les séries gagnent du terrain. répartition des tournages selon leur type : longs métrages, séries TV, séries web, téléfilms, documentaires, etc. Il permet de comprendre quel format de production domine à Paris et de comparer les volumes entre les différentes catégories. On voit immédiatement si les longs métrages restent le format dominant ou si les séries gagnent du terrain.",
  thumbnail: "../public/picShootingTypeChart.png",
};

export const TypesByYearChartInfo = {
  id: "TypesByYearChart",
  title: "Types × Année",
  previewDescription:
    "Distribution des types de tournage par année (5 types principaux + Autres)",
  analysisDescription:
    "Ce graphique en aires empilées montre comment la composition des types de production a changé année après année. Il permet de suivre l'évolution des 5 principaux formats et d'observer les tendances : montée des séries web, persistance des longs métrages, émergence de nouveaux formats. On comprend ainsi comment l'industrie cinématographique parisienne s'est transformée avec le temps. empilées montre comment la composition des types de production a changé année après année. Il permet de suivre l'évolution des 5 principaux formats et d'observer les tendances : montée des séries web, persistance des longs métrages, émergence de nouveaux formats. On comprend ainsi comment l'industrie cinématographique parisienne s'est transformée avec le temps.",
  thumbnail: "../public/picTypesByYearChart.png",
};
export const SimpleBarChartInfo = {
  id: "SimpleBarChart", // <-- C'est ton chartId
  title: "Répartition du nombre de tournage par arrondissement 🌀",
  previewDescription:
    "Ce graphique montre le nombre de tournages réalisés dans chaque arrondissement de Paris. Il permet d’identifier en un coup d’œil les zones où les tournages sont les plus fréquents.",
  analysisDescription:
    "Ce graphique classe les arrondissements de Paris par nombre de tournages du plus au moins actif. Il permet d'identifier rapidement les hotspots cinématographiques et de comprendre la géographie des productions : quels quartiers attirent le plus les équipes de tournage et pourquoi certains secteurs sont-ils plus actifs que d'autres. de Paris par nombre de tournages du plus au moins actif. Il permet d'identifier rapidement les hotspots cinématographiques et de comprendre la géographie des productions : quels quartiers attirent le plus les équipes de tournage et pourquoi certains secteurs sont-ils plus actifs que d'autres.",
  thumbnail: "../public/picSimpleBarChart.png",
};
