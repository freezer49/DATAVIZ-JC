import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Image from "./components/Image";
import LineChart from "./components/LineChart";
import TopDirectors from "./components/TopDirectors";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Image />} />
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
