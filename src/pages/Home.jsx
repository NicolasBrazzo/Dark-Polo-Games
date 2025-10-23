import { Link } from "react-router-dom";
import "../index.css";
import { Navbar } from "../components/Navbar";

export const Home = () => {
  return (
    <div className="relative min-h-screen bg-dark text-white p-6 overflow-hidden">
      {/* Animated background */}
      <div className="moving-bg" aria-hidden="true"></div>

      <Navbar />
      <div className="flex flex-col items-center">
        <h1 className="neon-title">Dark Polo Games</h1>
        <p className="text-normal">
          Benvenuto nella piattaforma dove potrai giocare con i tuoi rapperz
          preferiti
        </p>
      </div>

      <div id="games">
        <h2 className="text-center mt-10 mb-5">
          Giochi Attualmente disponibili
        </h2>
        <div className="flex justify-center items-center gap-5">
          <div className="card">
            <h2 className="neon-subtitle">Indovina chi Rapper</h2>
            <p className="text-normal">
              Fai delle domande al sistema per indovinare chi è il rapper da
              indovinare
            </p>
            <Link to="/indovinaChiRapper">
              <button className="btn-secondary">Gioca ora</button>
            </Link>
          </div>
        </div>
      </div>


      <div id="info"></div>
      <div id="madeby"></div>
    </div>
  );
};
