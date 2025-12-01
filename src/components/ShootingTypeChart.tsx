import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ShootingData {
  name: string;
  count: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: ShootingData }[];
  total: number;
}

const CustomTooltip = ({ active, payload, total }: CustomTooltipProps) => {
  if (!active || !payload?.[0]) return null;

  const d = payload[0].payload;
  const percentage = total > 0 ? ((d.count / total) * 100).toFixed(1) : "0";

  return (
    <div className="bg-white p-3 border rounded shadow-lg text-sm">
      <p className="font-bold">{d.name}</p>
      <p>🎬 {d.count} tournages</p>
      <p className="text-blue-600 font-semibold">📊 {percentage}% du total</p>
    </div>
  );
};

export default function ShootingTypeChart() {
  const [data, setData] = useState<ShootingData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const promises = [];
      for (let i = 0; i < 5; i++) {
        promises.push(
          fetch(
            `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?select=type_tournage&limit=100&offset=${
              i * 100
            }`
          )
            .then((res) => (res.ok ? res.json() : { results: [] }))
            .catch(() => ({ results: [] }))
        );
      }

      const results = await Promise.all(promises);
      const films = results.flatMap((page) => page.results || []);

      const shooting: Record<string, ShootingData> = {};
      films.forEach((film) => {
        const type = film.type_tournage?.trim();
        if (!type) return;
        if (!shooting[type]) shooting[type] = { name: type, count: 0 };
        shooting[type].count++;
      });

      const top10 = Object.values(shooting)
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      setData(top10);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>Chargement...</p>;

  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
        <YAxis />
        <Tooltip content={<CustomTooltip total={total} />} />
        <Bar dataKey="count" fill="#580D11" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
