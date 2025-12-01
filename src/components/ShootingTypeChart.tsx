import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ShootingTypeChartInfo } from "./ChartInfo";

// TypeScript : structure des données
interface ShootingData {
  name: string;
  count: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    payload: ShootingData;
  }[];
  total: number;
}

// ---------------------------
// CustomTooltip défini en dehors du composant
// ---------------------------
const CustomTooltip = ({ active, payload, total }: CustomTooltipProps) => {
  if (!active || !payload?.[0]) return null;

  const d = payload[0].payload;
  const percentage = ((d.count / total) * 100).toFixed(1);

  return (
    <div className="bg-white p-3 border rounded shadow-lg text-sm">
      <p className="font-bold">{d.name}</p>
      <p>🎬 {d.count} tournages</p>
      <p className="text-blue-600 font-semibold">📊 {percentage}% du total</p>
    </div>
  );
};

// ---------------------------
// Composant principal
// ---------------------------
export default function ShootingTypeChart() {
  const [data, setData] = useState<ShootingData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const promises = [];

      // API paginée : 5 pages × 100 résultats
      for (let i = 0; i < 5; i++) {
        promises.push(
          fetch(
            `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?select=type_tournage&limit=100&offset=${
              i * 100
            }`
          )
            .then((res) => (res.ok ? res.json() : { results: [] }))
            .catch(() => ({ results: [] }))
        );
      }

      const results = await Promise.all(promises);

      // Fusionner toutes les pages
      const films = results.flatMap((page) => page.results || []);

      // Compter les types de tournages
      const shooting: Record<string, ShootingData> = {};
      films.forEach((film) => {
        const type = film.type_tournage?.trim();
        if (!type) return;

        if (!shooting[type]) {
          shooting[type] = { name: type, count: 0 };
        }
        shooting[type].count++;
      });

      // Trier par fréquence et prendre le top 10
      const top10 = Object.values(shooting)
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      setData(top10);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Afficher un message pendant le chargement
  if (loading) {
    return (
      <div className="p-5">
        <h2 className="text-2xl font-bold">{ShootingTypeChartInfo.title}</h2>
        <p className="text-gray-500 mb-5">
          {ShootingTypeChartInfo.analysisDescription}
        </p>
        <p className="text-gray-400 italic">Chargement des données...</p>
      </div>
    );
  }

  // Calcul du total pour le tooltip
  const total = data.reduce((sum, item) => sum + item.count, 0);

  // Affichage du graphique
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold">{ShootingTypeChartInfo.title}</h2>
      <p className="text-gray-500 mb-5">
        {ShootingTypeChartInfo.analysisDescription}
      </p>

      <BarChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
        <YAxis />
        <Tooltip content={<CustomTooltip total={total} />} />
        <Bar
          dataKey="count"
          fill="#580D11"
          radius={[8, 8, 0, 0]}
          label={{ position: "top" }}
        />
      </BarChart>
    </div>
  );
}
