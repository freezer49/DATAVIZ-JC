interface HomeCardProps {
  chartInfo: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
  };
}

export default function HomeCard({ chartInfo }: HomeCardProps) {
  return (
    <div
      className="card border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer flex items-center gap-4"
      // Redirection vers la page du graphique
      onClick={() => (window.location.href = `/analyse`)}
    >
      {/* Texte à gauche */}
      <div className="flex-1">
        <h3 className="text-lg font-bold">{chartInfo.title}</h3>
        <p className="text-gray-500 text-sm">{chartInfo.description}</p>
      </div>

      {/* Image à droite */}
      <div className="flex-shrink-0 w-32 h-32 overflow-hidden rounded">
        <img
          src={chartInfo.thumbnail}
          alt={`${chartInfo.title} thumbnail`}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
