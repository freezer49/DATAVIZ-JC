// 3️⃣ Types × Année
// Aire empilée (stacked area chart)

// 5 types principaux + catégorie "Autres"

import { useState, useEffect } from "react";
import { TypesByYearChartInfo } from "./ChartInfo";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Structure TypeScript : définit la forme des données
interface YearlyTypeData {
  year: string;
  [key: string]: string | number;
}

interface FilmRecord {
  type_tournage?: string;
  date_debut?: string;
}

// Composant React principal
export default function TypesByYearChart() {
  // State pour stocker les données par année
  const [data, setData] = useState<YearlyTypeData[]>([]);

  // State pour gérer l'affichage du message de chargement
  const [loading, setLoading] = useState(true);

  // useEffect : récupère et traite les données au chargement du composant
  useEffect(() => {
    const fetchData = async () => {
      // 1. Récupérer tous les types de tournages pour identifier les 5 principaux
      const promises = [];
      for (let i = 0; i < 5; i++) {
        // 5 pages = 500 résultats
        promises.push(
          fetch(
            `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?select=type_tournage,date_debut&limit=100&offset=${
              i * 100
            }`
          )
            .then((res) => {
              if (!res.ok) return { results: [] };
              return res.json();
            })
            .catch(() => ({ results: [] }))
        );
      }

      const results = await Promise.all(promises);

      // 2. Combiner tous les résultats
      const films: FilmRecord[] = results.flatMap((page) => page.results || []);

      // 3. Identifier les 5 types principaux
      const typeCount: Record<string, number> = {};
      films.forEach((film) => {
        const type = film.type_tournage?.trim();
        if (type) {
          typeCount[type] = (typeCount[type] || 0) + 1;
        }
      });

      const topTypes = Object.entries(typeCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([type]) => type);

      // 4. Organiser les données par année
      const yearlyData: Record<string, Record<string, number>> = {};

      films.forEach((film) => {
        const type = film.type_tournage?.trim();
        const year = film.date_debut
          ? film.date_debut.substring(0, 4)
          : "Inconnu";

        if (!yearlyData[year]) {
          yearlyData[year] = {};
          topTypes.forEach((t) => {
            yearlyData[year][t] = 0;
          });
          yearlyData[year]["Autres"] = 0;
        }

        if (topTypes.includes(type!)) {
          yearlyData[year][type!]++;
        } else {
          yearlyData[year]["Autres"]++;
        }
      });

      // 5. Convertir en tableau et trier par année
      const chartData = Object.entries(yearlyData)
        .map(([year, types]) => ({
          year,
          ...types,
        }))
        .sort((a, b) => a.year.localeCompare(b.year));

      setData(chartData);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Fonction pour obtenir la couleur en fonction du type
  const getColorForType = (type: string): string => {
    if (type === "Long métrage") {
      return "#580D11";
    } else if (type === "Série TV") {
      return "#EAC277";
    } else if (type === "Série Web") {
      return "#8e2026";
    } else if (type === "Autres") {
      return "#586F7C";
    }
    // Couleurs par défaut pour les autres types
    const defaultColors = ["#D62828", "#F77F00", "#FCBF49", "#EAE2B7"];
    return defaultColors[Math.abs(type.charCodeAt(0) % defaultColors.length)];
  };

  const allTypes =
    data.length > 0 ? Object.keys(data[0]).filter((k) => k !== "year") : [];

  // Composant personnalisé pour l'infobulle
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || payload.length === 0) return null;
    return (
      <div className="bg-white p-3 border rounded shadow-lg text-sm">
        <p className="font-bold">{payload[0].payload.year}</p>
        {payload
          .sort((a: any, b: any) => b.value - a.value)
          .map((item: any, i: number) => (
            <p key={i} style={{ color: item.color }}>
              {item.name}: {item.value}
            </p>
          ))}
      </div>
    );
  };

  if (loading) {
    return <div className="p-5 text-center">Chargement des données...</div>;
  }

  // Affichage du graphique avec les données
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold">{TypesByYearChartInfo.title}</h2>
      <p className="text-gray-500 mb-5">{TypesByYearChartInfo.description}</p>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: "20px" }} height={30} />
          {allTypes.map((type) => (
            <Area
              key={type}
              type="monotone"
              dataKey={type}
              stackId="1"
              stroke={getColorForType(type)}
              fill={getColorForType(type)}
              isAnimationActive={false}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
