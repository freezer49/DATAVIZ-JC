export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg">
      <nav className="flex gap-8 px-8 py-4">
        <a
          href="/"
          className="text-[#220100] font-medium hover:opacity-70 transition-opacity active:border-black"
        >
          Accueil
        </a>
        <a
          href="/analyse"
          className="text-[#220100] font-medium hover:opacity-70 transition-opacity active:border-black"
        >
          Analyse
        </a>
      </nav>
    </header>
  );
}
