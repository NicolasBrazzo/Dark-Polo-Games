import { ArrowDown, ArrowUp, Home, House, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { GAMES } from "../data/gamesData";
import { useEffect, useState } from "react";

export const Sidebar = ({ open, setOpening }) => {
  const [sectionOpen, setSectinOpen] = useState(null);
  const game = GAMES[sectionOpen];

  useEffect(() => {
    console.log(sectionOpen);
  }, [sectionOpen]);

  const content = game ? (
    <>
      <div className="flex justify-between items-start gap-4">
        <div>
          {game.subtitle && (
            <p className="text-sm text-gray-300 mt-1">{game.subtitle}</p>
          )}
        </div>
      </div>

      {game.howTo && (
        <section className="mt-6">
          <h3 className="font-semibold text-gray-200 mb-2">Funzionamento</h3>
          <ol className="list-decimal ml-5 space-y-1 text-gray-300">
            {game.howTo.map((s, i) => (
              <li key={i} className="text-sm leading-tight">
                {s}
              </li>
            ))}
          </ol>
        </section>
      )}

      {game.rules && (
        <section className="mt-6">
          <h3 className="font-semibold text-gray-200 mb-2">Regole</h3>
          <ul className="list-disc ml-5 space-y-1 text-gray-300">
            {game.rules.map((r, i) => (
              <li key={i} className="text-sm leading-tight">
                {r}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(game.route || game.rotue) && (
        <div className="mt-6">
          <Link
            to={
              Array.isArray(game.route || game.rotue)
                ? (game.route || game.rotue)[0]
                : game.route || game.rotue
            }
          >
            <button className="btn-secondary mt-4">Gioca</button>
          </Link>
        </div>
      )}
    </>
  ) : (
    <div className="text-gray-300">Gioco non trovato</div>
  );

  return (
    <>
      <button onClick={() => setOpening(!open)} className="z-50 m-5 relative">
        <Menu />
      </button>
      {/* overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-20 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpening(false)}
        aria-hidden={!open}
      />

      {/* sidebar container */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 w-80 md:w-96 max-w-full bg-gradient-to-b from-gray-900/95 to-gray-900/90 text-white shadow-2xl p-6 transform transition-transform duration-300 ease-in-out
          ${open ? "-translate-x-0" : "-translate-x-full"}
        `}
        role="dialog"
        aria-modal={open}
        aria-hidden={!open}
      >
        <button
          aria-label="Chiudi sidebar"
          onClick={() => setOpening(false)}
          className="ml-2 p-2 rounded-md hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
        >
          ✕
        </button>
        <div className="h-full overflow-y-auto pr-2">
          <Link to={"/"}>
            <div className="border flex items-center gap-3 border-slate-300/30 my-3 p-5 w-fit transition duration-300 hover:bg-slate-700 cursor-pointer">
              <House /> <span>Torna alla Home</span>
            </div>
          </Link>
          {/* {content} */}
          {Object.entries(GAMES).map(([key, game]) => (
            <div
              key={key}
              className={`${
                sectionOpen !== key && "hover:bg-slate-700"
              } border border-slate-300/30 my-3 p-5 transition duration-300`}
              onClick={() => {
                if (sectionOpen === key) {
                  setSectinOpen(null);
                } else {
                  setSectinOpen(key);
                }
              }}
            >
              <div
                key={key}
                className="flex justify-between items-center cursor-pointer"
              >
                <h2
                  className={`${sectionOpen === key && "font-bold text-white"}`}
                >
                  {game.title}
                </h2>
                {sectionOpen === key ? <ArrowUp /> : <ArrowDown />}
              </div>
              {sectionOpen === key && <div>{content}</div>}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};
