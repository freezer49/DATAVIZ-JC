import "./App.css";
import Image from "./components/Image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LineChart from "./components/LineChart";
import { Line } from "recharts";

function App() {
  return (
    <div>
      <Header />
      <Image />
      <LineChart />
      <Footer />
    </div>
  );
}

export default App;
