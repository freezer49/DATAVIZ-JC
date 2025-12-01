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
import TypesByYearChart from "./components/TypesByYearChart";
import {
  LineChartInfo,
  TopDirectorsInfo,
  ShootingTypeChartInfo,
  SimpleBarChartInfo,
  TypesByYearChartInfo,
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
              <HomeCard chartInfo={SimpleBarChartInfo} />
              <HomeCard chartInfo={TypesByYearChartInfo} />
              {/* Tu peux ajouter d'autres HomeCard ici pour d'autres graphiques */}
            </div>
          }
        />

        {/* Page Analyse */}
        <Route
          path="/analyse"
          element={
            <div className="p-8">
              <h1>Analyse</h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LineChart />
                <ShootingTypeChart />
                <TopDirectors />
                <SimpleBarChart />
                <TypesByYearChart />
              </div>
            </div>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
