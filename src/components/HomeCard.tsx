import { useNavigate } from "react-router-dom";

interface HomeCardProps {
  chartInfo: {
    id: string;
    title: string;
    previewDescription: string;
    thumbnail: string;
  };
}

export default function HomeCard({ chartInfo }: HomeCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="card border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer flex flex-row items-start gap-4"
      // Redirection vers la page du graphique
      onClick={() => navigate("/analyse")}
    >
      {/* Texte à gauche */}
      <div className="flex-1">
        <h3 className="text-lg font-bold">{chartInfo.title}</h3>
        <p className="text-gray-500 text-sm">{chartInfo.previewDescription}</p>
      </div>

      {/* Image à droite */}
      <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 overflow-hidden rounded">
        <img
          src={chartInfo.thumbnail}
          alt={`${chartInfo.title} thumbnail`}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
