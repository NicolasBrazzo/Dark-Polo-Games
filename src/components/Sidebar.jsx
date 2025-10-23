import { GAMES } from "../data/gamesData";

export const Sidebar = ({ gameId, open, setOpening }) => {
  const game = GAMES[gameId];

  // se non trovi il gioco, mostriamo un fallback ma teniamo comunque la sidebar montata
  const content = game ? (
    <>
      <div className="flex justify-between items-start gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">{game.title}</h2>
          {game.subtitle && (
            <p className="text-sm text-gray-300 mt-1">{game.subtitle}</p>
          )}
        </div>
        <button
          aria-label="Chiudi sidebar"
          onClick={() => setOpening(false)}
          className="ml-2 p-2 rounded-md hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
        >
          ✕
        </button>
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
    </>
  ) : (
    <div className="text-gray-300">Gioco non trovato</div>
  );

  return (
    <>
      {/* overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
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
        <div className="h-full overflow-y-auto pr-2">
          {content}

          {/* footer area: restart / extra info */}
          <div className="mt-8 border-t border-gray-800 pt-4">
            <button
              onClick={() => {
                // reset game logic lato parent: chiama la callback di chiusura
                // qui chiudiamo semplicemente
                setOpening(false);
              }}
              className="btn-primary py-2 rounded-md bg-cyan-500 hover:bg-cyan-600 text-black font-semibold"
            >
              Chiudi
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
