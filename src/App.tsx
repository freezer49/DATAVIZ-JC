import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Image from "./components/Image";
import LineChart from "./components/LineChart";
import TopDirectors from "./components/TopDirectors";
import HomeCard from "./components/HomeCard";
import { LineChartInfo } from "./components/ChartInfo";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* Page d'accueil */}
        <Route
          path="/"
          element={
            <div className="p-8 flex flex-col gap-6">
              <Image />
              <HomeCard chartInfo={LineChartInfo} />
              {/* Tu peux ajouter d'autres HomeCard ici pour d'autres graphiques */}
            </div>
          }
        />

        {/* Page Analyse */}
        <Route
          path="/analyse"
          element={
            <div className="p-8">
              <h1 className="text-3xl font-bold text-center mb-8">Analyse</h1>
              <LineChart />
              <TopDirectors />
            </div>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
