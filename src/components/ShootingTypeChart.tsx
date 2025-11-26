// 2️⃣ Répartition par type de tournage
// // Barres verticales

// // Top des types (type_tournage) : long métrage, série, téléfilm…

// // Afficher le pourcentage ou le volume total.

// // Import des hooks React pour gérer l'état et les effets
import { useState, useEffect } from "react";

// // Import des composants Recharts pour créer le graphique
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Structure TypeScript : définit la forme des données d'un réalisateur

interface ShootingData {
  name: string;
  count: number;
  years: string[];
  types: string[];
}

// Composant React principal qui affichera le graphique des top réalisateurs
export default function ShootingTypeChart() {
  // State pour stocker le top 10 des réalisateurs
  const [data, setData] = useState<ShootingData[]>(
    Array(10).fill({ name: "Chargement...", count: 10, years: [], types: [] })
  );

  // State pour gérer l'affichage du message de chargement
  const [loading, setLoading] = useState(true);

  // useEffect : récupère et traite les données au chargement du composant

  useEffect(() => {
    const fetchData = async () => {
      // 1. Récupérer le top total des types de tournages dans l'API
      const promises = [];
      for (let i = 0; i < 5; i++) {
        // 5 pages = 500 résultats
        promises.push(
          fetch(
            `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?select=type_tournage&limit=100&offset=${
              i * 100
            }`
          )
            .then((res) => {
              if (!res.ok) return { results: [] };
              return res.json();
            })
            .catch(() => ({ results: [] }))
        );

        const results = await Promise.all(promises);
      }
      const results = await Promise.all(promises);

      // 3. Combiner tous les résultats en un seul tableau

      const films = results.flatMap((page) => page.results || []);

      // 4. recuperer  les types de tournages  et les mettres par top des plus presents (long métrage, série, téléfilm…)

      const shooting: Record<string, ShootingData> = {};
      films.forEach((film) => {
        const type = film.type_tournage?.trim();
        if (!type) return;

        if (!shooting[type]) {
          shooting[type] = { name: type, count: 0, years: [], types: [] };
        }

        shooting[type].count++;
      });

      // 5. Trier par types de tournages et garder seulement le top 10

      const top10 = Object.values(shooting)
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      setData(top10);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Composant personnalisé pour l'infobulle (affiche détails au survol)
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.[0]) return null;
    const d = payload[0].payload;
    const total = data.reduce((sum, item) => sum + item.count, 0);
    const percentage = total > 0 ? ((d.count / total) * 100).toFixed(1) : 0;
    return (
      <div className="bg-white p-3 border rounded shadow-lg text-sm">
        <p className="font-bold">{d.name}</p>
        <p>🎬 {d.count} tournages</p>
        <p className="text-blue-600 font-semibold">📊 {percentage}% du total</p>
      </div>
    );
  };

  // Affichage du graphique avec les données du top 10
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold">Répartition par type de tournage</h2>
      <p className="text-gray-500 mb-5">
        Distribution des tournages selon leur type (long métrage, série,
        téléfilm, etc.)
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
        <Tooltip content={<CustomTooltip />} />
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
