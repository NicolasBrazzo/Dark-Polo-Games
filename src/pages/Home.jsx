import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import "../index.css";
import { GAMES } from "../data/gamesData";
import { Github, Instagram, Linkedin } from "lucide-react";

export const Home = () => {
  const avaliableGames = Object.entries(GAMES).filter(
    ([_, game]) => !game.disabledButton
  );
  const upComingGames = Object.entries(GAMES).filter(
    ([_, game]) => game.disabledButton
  );

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

      <div id="games-avaliable">
        <h2 className="text-center mt-10 mb-5">
          Giochi Attualmente disponibili
        </h2>

        {avaliableGames.length === 0 ? (
          <p className="text-muted text-center">
            ...Nessun gioco attualmente disponibile...
          </p>
        ) : (
          <div className="flex flex-wrap justify-center items-center gap-5">
            {avaliableGames.map(([key, game]) => (
              <div key={key} className="card max-w-[400px]">
                <h2 className="neon-subtitle">{game.title}</h2>
                <p className="text-normal">{game.subtitle}</p>
                <Link to={game.route}>
                  <button
                    className="btn-secondary"
                    disabled={game.disabledButton}
                  >
                    Gioca ora
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div id="games-not-avaliable" className="mt-20">
        <h2 className="text-center mt-10 mb-5">In arrivo</h2>

        {upComingGames.length === 0 ? (
          <p className="text-muted text-center">
            ...Nessun gioco in arrivo, al momento...
          </p>
        ) : (
          <div className="flex flex-wrap justify-center items-center gap-5">
            {upComingGames.map(([key, game]) => (
              <div key={key} className="card max-w-[400px] opacity-65">
                <h2 className="neon-subtitle">{game.title}</h2>
                <p className="text-normal">{game.subtitle}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div id="madeby" className="panel mt-30 mx-10 flex justify-center gap-5">
        <div className="card flex-1">
          <h2 className="neon-subtitle">Nicolas Brazzo</h2>
          <p>Descrizione</p>
        </div>
        <div className="card flex-2 flex text-center flex-col justify-center">
          <h3 className="text-2xl font-bold text-muted">
            Se vuoi saperne di più
          </h3>
          <p className="text-normal mx-auto">
            Seguimi sui miei canali, per vedere tutti i miei progetti futuri
          </p>
          <div className="flex justify-center items-center gap-5 my-4">
            <a href="https://www.instagram.com/brazz0_/" target="blank">
              <Instagram />
            </a>
            <a href="https://github.com/NicolasBrazzo" target="blank">
              <Github />
            </a>
            <a
              href="https://www.linkedin.com/in/nicolas-brazzo-a91509286/"
              target="blank"
            >
              <Linkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
