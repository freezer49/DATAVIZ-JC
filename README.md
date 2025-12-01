🎯 Objectifs du projet

Pendant trois semaines, nous avons appris à :

Consommer une API open data (requêtes, pagination, filtres).

Manipuler et transformer des données pour les rendre exploitables.

Concevoir des graphiques interactifs avec Recharts.

Structurer une application en React + TypeScript.

Travailler en équipe avec Git (branches, pull requests, README).

Déployer une application web.

🧱 Stack technique utilisée

React + TypeScript (Vite)

Recharts pour les graphiques

React Router pour la navigation entre les pages

API Paris Data – Lieux de tournage à Paris (v2.1)

Déploiement prévu sur GitHub Pages

📡 Source des données

Nous avons utilisé l’API publique :
Lieux de tournage à Paris – Ville de Paris

Chaque enregistrement correspond à un tournage autorisé depuis 2016.
Voici quelques champs importants exploités :

nom_tournage → nom de l’œuvre

nom_realisateur → réalisateur / réalisatrice

type_tournage → long-métrage, série, téléfilm, etc.

annee_tournage → année

ardt_lieu → arrondissement

geo_point_2d → coordonnées

📊 Visualisations réalisées
1️⃣ Évolution du nombre de tournages par année

Graphique LineChart

Permet d’identifier les tendances (pics, baisses, années intenses…)

2️⃣ Répartition par type de tournage

BarChart vertical

Comparaison claire entre les types de productions

3️⃣ Types × Année

AreaChart empilé

Représentation des 5 types principaux + "Autres"

Permet de voir la dynamique des catégories dans le temps

4️⃣ Tournages par arrondissement

BarChart horizontal

Classé du plus au moins actif

Ajout d’un filtre permettant de sélectionner un arrondissement

5️⃣ Top réalisateurs / réalisatrices

BarChart

Classement des cinéastes ayant le plus tourné à Paris

Info-bulles enrichies

🚀 Lancer le projet
npm install
npm run dev

🌐 Déploiement

Le projet peut être déployé facilement sur :

Vercel

Netlify

GitHub Pages

👥 Travail collaboratif

Nous avons utilisé Git pour collaborer efficacement :
branches, pull requests, revues, documentation.

📝 Remarque

Ce projet a été réalisé dans un cadre pédagogique et nous a permis de découvrir plus en profondeur :

l’écosystème React,

la visualisation de données,

et le fonctionnement d’une API publique.
