// Import des hooks React pour gérer l'état et les effets
import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { LineChartInfo } from "./ChartInfo";

// --- Types ---
interface TournageAPI {
  nom_tournage: string;
  annee_tournage: number | null;
}

interface ChartPoint {
  year: string;
  count: number;
}

// --- Fetch avec typage ---
async function Fetch(): Promise<TournageAPI[]> {
  const response = await fetch(
    "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?select=nom_tournage%2C%20annee_tournage&limit=100&offset=0"
  );

  const data = await response.json();

  return data.results;
}

// Composant React principal qui affichera le graphique
export default function Example() {
  // State pour stocker les données transformées à afficher dans le graphique
  const [chartData, setChartData] = useState<ChartPoint[]>([]);

  useEffect(() => {
    async function load() {
      const results = await Fetch();

      // Comptage des tournages par année
      const counts = results.reduce<Record<string, number>>((acc, item) => {
        const year = item.annee_tournage;

        if (!year) return acc;

        const yearStr = String(year);
        acc[yearStr] = (acc[yearStr] || 0) + 1;

        return acc;
      }, {});

      const final: ChartPoint[] = Object.entries(counts).map(
        ([year, count]) => ({
          year,
          count,
        })
      );

      setChartData(final);
    }

    load();
  }, []);

  return (
    <div className="p-3 sm:p-5 w-full h-full flex flex-col">
      <h2 className="text-base sm:text-2xl font-bold">{LineChartInfo.title}</h2>
      <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-5">
        {LineChartInfo.analysisDescription}
      </p>

      <div className="flex-1 w-full min-h-[250px] sm:min-h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#580D11"
              name="Nombre de tournages"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
