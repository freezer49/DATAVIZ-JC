import accueil from "../assets/accueil.jpg";

export default function BackgroundWithText() {
  return (
    <div className="relative w-full h-64">
      {/* Background flou */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[3px]"
        style={{ backgroundImage: `url(${accueil})` }}
      ></div>

      {/* Contenu net */}
      <div className="relative z-10 flex items-center justify-center h-full flex flex-col p-0 text-center ">
        <div className="p-5 bg-white md:p-10 rounded-xl ">
          <h1 className="text-black text-2xl font-bold">
            Bienvenue sur le projet Dataviz 📽️
          </h1>

          <p className="text-black">
            Dans ce projet vous allez découvrir une fine analyse des tournages
            réalisés à la capitale.
          </p>
        </div>
      </div>
    </div>
  );
}
