import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import "../index.css";
import { GAMES } from "../data/gamesData";

export const Home = () => {
  return (
    <div className="relative min-h-screen bg-dark text-white p-6 overflow-hidden">
      {/* Animated background */}
      <div className="moving-bg" aria-hidden="true"></div>

      <Navbar />

      <div className="flex flex-col items-center">
        <h1 className="neon-title">Dark Polo Games</h1>
        <p className="text-normal text-center">
          Benvenuto nella piattaforma dove potrai giocare con i tuoi rapperz
          preferiti
        </p>
      </div>

      <div id="games">
        <h2 className="text-center mt-10 mb-5">
          Giochi Attualmente disponibili
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-5">
          {Object.entries(GAMES).map(([key, game]) => (
            <div key={key} className="card max-w-[400px]">
              <h2 className="neon-subtitle">{game.title}</h2>
              <p className="text-normal">{game.subtitle}</p>
              <Link to={game.route}>
                <button className="btn-secondary" disabled={game.disabledButton}>Gioca ora</button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div id="info"></div>
      <div id="madeby"></div>
    </div>
  );
};
