import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChartContainer from "./components/ChartContainer";
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
            <div className="p-4 sm:p-6 md:p-8">
              <Image />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8">
                <HomeCard chartInfo={LineChartInfo} />
                <HomeCard chartInfo={TopDirectorsInfo} />
                <HomeCard chartInfo={ShootingTypeChartInfo} />
                <HomeCard chartInfo={SimpleBarChartInfo} />
                <HomeCard chartInfo={TypesByYearChartInfo} />
              </div>
              {/* Tu peux ajouter d'autres HomeCard ici pour d'autres graphiques */}
            </div>
          }
        />

        {/* Page Analyse */}
        <Route
          path="/analyse"
          element={
            <div className="p-4 sm:p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
                <ChartContainer>
                  <LineChart />
                </ChartContainer>
                <ChartContainer>
                  <ShootingTypeChart />
                </ChartContainer>
                <ChartContainer>
                  <TopDirectors />
                </ChartContainer>
                <ChartContainer>
                  <SimpleBarChart />
                </ChartContainer>
                <ChartContainer>
                  <TypesByYearChart />
                </ChartContainer>
              </div>
            </div>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
