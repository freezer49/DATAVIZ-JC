import "./App.css";
import Image from "./components/Image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LineChart from "./components/LineChart";
import TopDirectors from "./components/TopDirectors";

function App() {
  return (
    <div>
      <Header />
      <Image />
      <LineChart />
      <TopDirectors />
      <Footer />
    </div>
  );
}

export default App;
