import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg">
      <nav className="flex gap-8 px-8 py-4">
        <Link to="/" className="text-[#220100] font-medium hover:opacity-70">
          Accueil
        </Link>
        <Link
          to="/analyse"
          className="text-[#220100] font-medium hover:opacity-70"
        >
          Analyse
        </Link>
      </nav>
    </header>
  );
}
