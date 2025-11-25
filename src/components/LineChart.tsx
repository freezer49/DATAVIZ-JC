// Import des hooks React pour gérer l'état et les effets
import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

async function Fetch() {
  const response = await fetch(
    "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?select=nom_tournage%2C%20annee_tournage&limit=100&offset=0"
  );

  const data = await response.json();

  return data.results;
}

// Composant React principal qui affichera le graphique
export default function Example() {
  // State pour stocker les données transformées à afficher dans le graphique
  const [chartData, setChartData] = useState([]);

  // useEffect permet d'exécuter du code au montage du composant
  useEffect(() => {
    // Fonction interne pour charger et transformer les données
    async function load() {
      // Appel de la fonction Fetch pour récupérer les tournages
      const results = await Fetch();

      // Transformation des données pour compter le nombre de tournages par année
      const counts = results.reduce((acc, item) => {
        const year = item.annee_tournage; // On récupère l'année du tournage

        // Ignore les tournages sans année
        if (!year) return acc;

        // Si l'année existe déjà dans l'objet, on incrémente le compteur
        // Sinon, on initialise à 1
        acc[year] = (acc[year] || 0) + 1;
        return acc;
      }, {}); // {} = objet vide pour accumuler les résultats

      const final = Object.entries(counts).map(([year, count]) => ({
        year, // clé pour l'axe X
        count, // valeur pour la ligne
      }));

      // Mise à jour du state chartData → déclenche le rendu du graphique
      setChartData(final);
    }

    load();
  }, []); // [] → useEffect s'exécute seulement une fois au montage du composant

  // Rendu JSX du graphique Recharts
  return (
    <LineChart
      width={700}
      height={400}
      data={chartData}
      margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="count" stroke="#82ca9d" />
    </LineChart>
  );
}
