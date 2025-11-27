import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Image from "./components/Image";
import LineChart from "./components/LineChart";
import ShootingTypeChart from "./components/ShootingTypeChart";
import TopDirectors from "./components/TopDirectors";
import SimpleBarChart from "./components/SimpleBarChart";
import HomeCard from "./components/HomeCard";
import {
  LineChartInfo,
  TopDirectorsInfo,
  ShootingTypeChartInfo,
} from "./components/ChartInfo";

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
              <HomeCard chartInfo={TopDirectorsInfo} />
              <HomeCard chartInfo={ShootingTypeChartInfo} />
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
              <ShootingTypeChart />
              <TopDirectors />
              <SimpleBarChart />
            </div>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
