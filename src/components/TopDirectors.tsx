// Graphique 5 : les Top réalisateurs / réalisatrices

// IMPORTS - Importer les outils qu'on va utiliser
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// FONCTION PRINCIPALE DU COMPOSANT

// CRÉER UN TYPE POUR LES DONNÉES
// Ça dit à TypeScript : "nos données ont un 'name' et un 'count'"

interface DirectorItem {
  name: string;
  count: number;
}

export default function TopDirectors() {
  // ÉTAPE 1 : CRÉER LES ÉTATS
  // data = stocke les 10 réalisateurs qu'on va afficher
  // <DirectorItem[]> = dit à React que data contient des DirectorItem
  const [data, setData] = useState<DirectorItem[]>([]);

  // loading = true quand on charge, false quand c'est fini
  const [loading, setLoading] = useState(true);

  // ÉTAPE 2 : USEEFFECT - S'exécute UNE SEULE FOIS au démarrage
  useEffect(() => {
    // ⚠️ IMPORTANT : L'API est paginée (100 résultats par page max)
    // Il faut faire plusieurs requêtes pour avoir TOUS les résultats

    const fetchAllData = async () => {
      try {
        console.log("🔄 Début du chargement de TOUS les tournages...");

        // ÉTAPE 2.1 : ALLER CHERCHER LA PREMIÈRE PAGE pour connaître le total
        const firstPageResponse = await fetch(
          "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=100&offset=0"
        );
        const firstPageData = await firstPageResponse.json();

        console.log("📊 Total de tournages dans l'API :", firstPageData.total_count);

        // ÉTAPE 2.2 : CALCULER COMBIEN DE PAGES IL FAUT
        // Si on a 14760 résultats et 100 par page = 148 pages
        const totalCount = firstPageData.total_count;
        const pageSize = 100;
        const totalPages = Math.ceil(totalCount / pageSize);

        console.log(`📄 Nombre de pages à charger : ${totalPages}`);

        // ÉTAPE 2.3 : CRÉER UN ARRAY AVEC TOUTES LES REQUÊTES
        // Exemple : [0, 100, 200, 300, ...]
        const offsets = [];
        for (let i = 0; i < totalPages; i++) {
          offsets.push(i * pageSize);
        }

        console.log("🔗 URLs à charger :", offsets.slice(0, 5), "...(et", offsets.length - 5, "autres)");

        // ÉTAPE 2.4 : FAIRE TOUTES LES REQUÊTES EN MÊME TEMPS (Promise.all)
        // Promise.all = "lance toutes les requêtes en parallèle"
        const allPages = await Promise.all(
          offsets.map((offset) =>
            fetch(
              `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=100&offset=${offset}`
            )
              .then((response) => response.json())
              .catch((error) => {
                console.error(`❌ Erreur pour offset ${offset}:`, error);
                return { results: [] };
              })
          )
        );

        console.log("✅ Toutes les pages chargées !");

        // ÉTAPE 2.5 : COMBINER TOUS LES RÉSULTATS EN UN SEUL ARRAY
        // results = [ ...page1, ...page2, ...page3, ... ]
        const allResults: any[] = [];
        allPages.forEach((page) => {
          if (page.results && page.results.length > 0) {
            allResults.push(...page.results);
          }
        });

        console.log(`📽️ Total de tournages récupérés : ${allResults.length}`);

        // ÉTAPE 2.6 : CRÉER UN OBJET VIDE POUR COMPTER
        const directors: Record<string, number> = {};
        let countProcessed = 0;
        let countSkipped = 0;

        // ÉTAPE 2.7 : BOUCLER SUR CHAQUE TOURNAGE
        allResults.forEach((film: any) => {
          const name = film.nom_realisateur;

          // Ignorer si le nom est vide
          if (!name || typeof name !== "string" || name.trim() === "") {
            countSkipped++;
            return;
          }

          const cleanName = name.trim();

          // Créer une nouvelle entrée si elle n'existe pas
          if (!directors[cleanName]) {
            directors[cleanName] = 0;
          }

          // Augmenter le compte
          directors[cleanName] = directors[cleanName] + 1;
          countProcessed++;
        });

        console.log(`✅ Traités: ${countProcessed}, ⏭️ Ignorés: ${countSkipped}`);

        // ÉTAPE 2.8 : CONVERTIR EN TABLEAU
        const directorsArray = Object.keys(directors).map((name) => ({
          name: name,
          count: directors[name],
        }));

        console.log("📋 Nombre unique de réalisateurs :", directorsArray.length);

        // ÉTAPE 2.9 : TRIER DU PLUS GRAND AU PLUS PETIT
        directorsArray.sort((a, b) => b.count - a.count);

        // ÉTAPE 2.10 : PRENDRE LES 10 PREMIERS
        const top10 = directorsArray.slice(0, 10);

        console.log("🏆 Top 10 final :", top10);

        // ÉTAPE 2.11 : SAUVEGARDER ET TERMINER
        setData(top10);
        setLoading(false);

      } catch (error) {
        console.error("❌ Erreur générale :", error);
        setLoading(false);
      }
    };

    // Lancer la fonction asynchrone
    fetchAllData();
  }, []); // [] = s'exécute une seule fois au démarrage

  // 📍 ÉTAPE 3 : AFFICHER LE MESSAGE DE CHARGEMENT SI NÉCESSAIRE
  // if (loading) = si c'est encore en train de charger
  if (loading) {
    return <p>⏳ Chargement des données...</p>;
  }

  // 📍 ÉTAPE 4 : AFFICHER LE GRAPHIQUE AVEC LES DONNÉES
  return (
    <div style={{ padding: "20px" }}>
      {/* Titre du graphique */}
      <h2>📊 Top 10 Réalisateurs/Réalisatrices à Paris</h2>

      {/* Sous-titre */}
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Les réalisateurs avec le plus de tournages enregistrés
      </p>

      {/* 📍 ÉTAPE 4.1 : LE GRAPHIQUE RECHARTS */}
      {/* BarChart = crée un graphique avec des barres */}
      <BarChart
        width={800} // Largeur en pixels
        height={400} // Hauteur en pixels
        data={data} // Les données qu'on a préparées (top 10)
        margin={{
          top: 20, // Espace en haut
          right: 30, // Espace à droite
          left: 20, // Espace à gauche
          bottom: 100, // Espace en bas (pour les noms longs)
        }}
      >
        {/* 📍 ÉTAPE 4.2 : LA GRILLE POINTILLÉE DE FOND */}
        <CartesianGrid strokeDasharray="3 3" />

        {/* 📍 ÉTAPE 4.3 : L'AXE X (horizontal) - LES NOMS */}
        <XAxis
          dataKey="name" // Prend le champ "name" de nos données
          angle={-45} // Tourne le texte de -45 degrés pour le lire
          textAnchor="end" // Aligne le texte à la fin
          height={100} // Réserve 100px pour les noms
        />

        {/* 📍 ÉTAPE 4.4 : L'AXE Y (vertical) - LES NOMBRES */}
        <YAxis />

        {/* 📍 ÉTAPE 4.5 : L'INFOBULLE AU SURVOL */}
        {/* Quand tu mets ta souris sur une barre, ça affiche les infos */}
        <Tooltip />

        {/* 📍 ÉTAPE 4.6 : LES BARRES BLEUES */}
        {/* Bar = crée les barres du graphique */}
        <Bar
          dataKey="count" // Affiche le champ "count"
          fill="#8884d8" // Couleur bleue
          radius={[8, 8, 0, 0]} // Coins arrondis en haut
          label={{ position: "top" }} // Affiche le nombre sur la barre
        />
      </BarChart>
    </div>
  );
}
