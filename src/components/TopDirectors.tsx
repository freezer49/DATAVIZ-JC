// Import des hooks React pour gérer l'état et les effets
import { useState, useEffect } from "react";

// Import des composants Recharts pour créer le graphique
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Structure TypeScript : définit la forme des données d'un réalisateur
interface DirectorData {
  name: string;
  count: number;
  years: string[];
  types: string[];
}

// Composant React principal qui affichera le graphique des top réalisateurs
export default function TopDirectors() {
  // State pour stocker le top 10 des réalisateurs
  const [data, setData] = useState<DirectorData[]>(
    Array(10).fill({ name: "Chargement...", count: 10, years: [], types: [] })
  );

  // State pour gérer l'affichage du message de chargement
  const [loading, setLoading] = useState(true);

  // useEffect : récupère et traite les données au chargement du composant
  useEffect(() => {
    const fetchData = async () => {
      // 1. Récupérer le nombre total de tournages dans l'API
      const first = await fetch(
        "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=100&offset=0"
      );
      const { total_count } = await first.json();

      // 2. Charger toutes les pages en parallèle (l'API est paginée par 100)
      // Limiter à 10000 entrées max pour éviter les erreurs d'API
      const maxOffset = Math.min(10000, total_count);
      const pages = Math.ceil(maxOffset / 100);
      const promises = [];
      for (let i = 0; i < pages; i++) {
        promises.push(
          fetch(
            `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=100&offset=${
              i * 100
            }`
          )
            .then((res) => {
              if (!res.ok) return { results: [] }; // Retourner un tableau vide si erreur
              return res.json();
            })
            .catch(() => ({ results: [] })) // Ignorer les erreurs réseau
        );
      }
      const results = await Promise.all(promises);

      // 3. Combiner tous les résultats en un seul tableau
      const films = results.flatMap((page) => page.results || []);

      // 4. Compter les tournages par réalisateur et collecter années/types
      const directors: Record<string, DirectorData> = {};
      films.forEach((film) => {
        const name = film.nom_realisateur?.trim();
        if (!name) return;

        if (!directors[name]) {
          directors[name] = { name, count: 0, years: [], types: [] };
        }

        directors[name].count++;
        if (
          film.annee_tournage &&
          !directors[name].years.includes(film.annee_tournage)
        ) {
          directors[name].years.push(film.annee_tournage);
        }
        if (
          film.type_tournage &&
          !directors[name].types.includes(film.type_tournage)
        ) {
          directors[name].types.push(film.type_tournage);
        }
      });

      // 5. Trier par nombre de tournages et garder seulement le top 10
      const top10 = Object.values(directors)
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
    return (
      <div className="bg-white p-3 border rounded shadow-lg text-sm">
        <p className="font-bold">{d.name}</p>
        <p>🎬 {d.count} tournages</p>
        <p className="text-gray-600">📅 {d.years.join(", ")}</p>
        <p className="text-gray-600">🎥 {d.types.join(", ")}</p>
      </div>
    );
  };

  // Affichage du graphique avec les données du top 10
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold">
        📊 Top 10 Réalisateurs/Réalisatrices à Paris
      </h2>
      <p className="text-gray-500 mb-5">
        Les réalisateurs avec le plus de tournages enregistrés
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
