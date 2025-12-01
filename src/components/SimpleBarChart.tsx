import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { SimpleBarChartInfo } from "./ChartInfo";

async function Fetch() {
  const response = await fetch(
    "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?select=ardt_lieu&limit=100&offset=0"
  );

  const data = await response.json();

  return data.results;
}

type ResultItem = {
  ardt_lieu: string;
};

const results: ResultItem[] = await Fetch();

// Regroupement par arrondissement
const arrondissement: Record<string, number> = results.reduce((acc, item) => {
  acc[item.ardt_lieu] = (acc[item.ardt_lieu] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const dataInitial = Object.entries(arrondissement).map(
  ([name, nbTournage]) => ({
    name,
    nbTournage,
  })
);

const dataSorted = dataInitial.sort((a, b) => b.nbTournage - a.nbTournage);

const SimpleBarChart = () => {
  // ---------------------------------------------------------------
  // 1️⃣ ÉTAT POUR STOCKER L’ARRONDISSEMENT SÉLECTIONNÉ
  // ---------------------------------------------------------------
  // On crée un state qui contient l’arrondissement choisi dans le menu déroulant.
  // Par défaut, il vaut "Tous", ce qui signifie qu’aucun filtre n’est appliqué.
  // Quand l’utilisateur choisit un arrondissement, on modifie ce state.
  const [selectedArdt, setSelectedArdt] = useState<string>("Tous");

  // ---------------------------------------------------------------
  // 2️⃣ LISTE DES OPTIONS DU MENU DÉROULANT
  // ---------------------------------------------------------------
  // useMemo permet d’éviter de recalculer le tableau à chaque re-render.
  // Ici, la liste d'arrondissements est construite une seule fois,
  // car dataSorted ne change jamais après le chargement initial.
  const ardtOptions = useMemo(
    () =>
      // On crée un tableau avec :
      // - "Tous" comme première option
      // - puis tous les arrondissements issus des données
      ["Tous", ...dataSorted.map((d) => d.name)],

    // Dépendances : comme le tableau est vide, ce calcul ne se fera qu'une seule fois.
    []
  );

  // ---------------------------------------------------------------
  // 3️⃣ CALCUL DES DONNÉES À AFFICHER DANS LE GRAPHIQUE
  // ---------------------------------------------------------------
  // Ce useMemo recalcule filteredData uniquement si selectedArdt change.
  // Cela évite de refaire un filter() inutilement à chaque re-render.
  const filteredData = useMemo(() => {
    // Si on a choisi "Tous" dans la liste,
    // alors on retourne toutes les données sans filtrer.
    if (selectedArdt === "Tous") return dataSorted;

    // Sinon, on filtre le tableau pour ne garder
    // que les entrées correspondant à l’arrondissement choisi.
    return dataSorted.filter((d) => d.name === selectedArdt);

    // Dépendances : on recalcule uniquement si l’utilisateur change d’arrondissement.
  }, [selectedArdt]);

  return (
    <div className="p-3 sm:p-5 w-full h-full flex flex-col">
      {/* Titre */}
      <h2 className="text-base sm:text-2xl font-bold">
        {SimpleBarChartInfo.title}
      </h2>

      {/* Description */}
      <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
        {SimpleBarChartInfo.analysisDescription}
      </p>

      {/* Filtre des arrondissements */}
      <div className="mb-4 sm:mb-5">
        <select
          className="border px-2 py-1 rounded text-xs sm:text-sm w-full sm:w-auto"
          value={selectedArdt}
          onChange={(e) => setSelectedArdt(e.target.value)}
        >
          {ardtOptions.map((option) => (
            <option key={option} value={option}>
              {option === "Tous" ? "Tous les arrondissements" : option}
            </option>
          ))}
        </select>
      </div>

      {/* Graphique */}
      <div className="flex-1 w-full min-h-[250px] sm:min-h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={filteredData}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey="nbTournage" fill="#580D11" name="Nombre de tournages" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SimpleBarChart;
