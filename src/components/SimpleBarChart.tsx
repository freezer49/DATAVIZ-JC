import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { SimpleBarChartInfo } from "./ChartInfo";

async function Fetch() {
  const response = await fetch(
    "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?select=ardt_lieu&limit=100&offset=0"
  );

  const data = await response.json();

  return data.results;
}

type ResultItem = {
  ardt_lieu: string;
};

const results: ResultItem[] = await Fetch();

const arrondissement: Record<string, number> = results.reduce((acc, item) => {
  acc[item.ardt_lieu] = (acc[item.ardt_lieu] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

// console.log("Coucou");
// console.log(arrondissement);

// #region Sample data
const data = Object.entries(arrondissement).map(([name, nbTournage]) => ({
  name,
  nbTournage,
}));

// #endregion
const SimpleBarChart = () => {
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold">{SimpleBarChartInfo.title}</h2>
      <p className="text-gray-500 mb-5">{SimpleBarChartInfo.description}</p>
      <BarChart
        layout="vertical"
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "70vh",
          aspectRatio: 1.618,
        }}
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />

        <Tooltip />
        <Legend />

        <Bar dataKey="nbTournage" fill="#580D11" />
      </BarChart>
    </div>
  );
};

export default SimpleBarChart;
