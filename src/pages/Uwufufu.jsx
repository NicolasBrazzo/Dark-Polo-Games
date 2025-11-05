import { Sidebar } from "../components/Sidebar";
import { useEffect, useState } from "react";
import { RAPPERS } from "../data/rappers";

export const Uwufufu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [numberElements, setNumberElements] = useState(8); // number (not string)
  const [genreSelected, setGenreSelected] = useState("trap");

  const [players, setPlayers] = useState([]);
  const [turn, setTurn] = useState(1);

  const [deletedRappers, setDeletedRappers] = useState([]);
  const [nextPool, setNextPool] = useState([]);

  const [loading, setLoading] = useState(false);

  // helper: Fisher-Yates shuffle (returns a new array)
  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const insertPlayer = (number, genre) => {
    const count = typeof number === "number" ? number : parseInt(number, 10);
    const filtered = RAPPERS.filter(
      (rapper) => Array.isArray(rapper.genre) && rapper.genre.includes(genre)
    );

    const shuffled = shuffle(filtered);
    const take = shuffled.slice(0, count);

    // inizializza players in modo pulito (sovrascrive)
    setPlayers(take);
    // reset pools
    setNextPool([]);
    setDeletedRappers([]);
    setTurn(1);
  };

  // Quando clicco su un giocatore (scelta tra i due mostrati)
  const playerSelected = (rapper) => {
    setPlayers((prevPlayers) => {
      const playerOne = prevPlayers[0];
      const playerTwo = prevPlayers[1];

      if (!playerOne || !playerTwo) return prevPlayers; // sicurezza

      if (rapper.id === playerOne.id) {
        // funzionale per evitare race
        setNextPool((prev) => [...prev, playerOne]);
        setDeletedRappers((prev) => [...prev, playerTwo]);
      } else if (rapper.id === playerTwo.id) {
        setNextPool((prev) => [...prev, playerTwo]);
        setDeletedRappers((prev) => [...prev, playerOne]);
      }

      // rimuovo i primi due dalla players corrente
      return prevPlayers.filter((p, idx) => idx !== 0 && idx !== 1);
    });
  };

  // Genera la pool successiva: aumenta turno e setta players = nextPool
  const generateNextPool = () => {
    setTurn((t) => t + 1);
    // usa il valore corrente di nextPool via funzionale? Qui è ok leggere nextPool perché
    // caller (useEffect) si assicurerà che nextPool abbia elementi e sia sincronizzato.
    setPlayers(nextPool);
    setNextPool([]);
    setDeletedRappers([]);
  };

  // Effetto che osserva players e nextPool: chiama generateNextPool SOLO quando
  // il gioco è iniziato, players è vuoto e nextPool ha elementi.
  useEffect(() => {
    console.log(players.length);
    if (isGameStarted && players.length === 0 && nextPool.length > 0) {
      generateNextPool();
    }
  }, [players, nextPool, isGameStarted]);

  useEffect(() => {
    console.log("Rapper eliminati: ", deletedRappers);
    console.log("Rapper nextPool: ", nextPool);
  }, [deletedRappers, nextPool]);

  return (
    <div>
      <div className="flex items-center">
        <Sidebar open={isSidebarOpen} setOpening={setIsSidebarOpen} />
        <h1 className="neon-subtitle underline">Indovina l'anno degli album</h1>
      </div>
      <div className="flex justify-center items-center mt-20">
        {!isGameStarted ? (
          <div className="card flex flex-col gap-5">
            <h1 className="text-4xl font-bold">Opzioni</h1>
            <p className="text-muted text-xl">
              Modifica le opzioni in base alle tue preferenze:
            </p>

            <div className="flex gap-4 items-center">
              <label htmlFor="genre" className="text-[20px]">
                Seleziona il genere
              </label>
              <select
                className="border p-3 rounded-[5px]"
                name="genre"
                id="genre"
                value={genreSelected}
                onChange={(e) => setGenreSelected(e.currentTarget.value)}
              >
                <option value="trap">Trap</option>
                <option value="rap">Rap</option>
                <option value="pop">Pop</option>
                <option value="drill">Drill</option>
              </select>
            </div>

            <div className="flex gap-4 items-center">
              <label htmlFor="numberSelected" className="text-[20px]">
                Imposta quanti giocatori
              </label>
              <select
                className="border p-3 rounded-[5px]"
                name="numberSelected"
                id="numberSelected"
                value={numberElements}
                onChange={(e) =>
                  setNumberElements(parseInt(e.currentTarget.value, 10))
                }
              >
                <option value={8}>8</option>
                <option value={16}>16</option>
                <option value={32}>32</option>
              </select>
            </div>
            <div className="flex justify-center mt-10">
              <button
                className="btn-primary"
                onClick={() => {
                  insertPlayer(numberElements, genreSelected);
                  setIsGameStarted(true);
                }}
              >
                Inizia
              </button>
            </div>
          </div>
        ) : (
          <div className="card sm:w-[60%] sm:h-[70vh] w-[80%]">
            <div className="w-full">
              <h2 className="text-center neon-subtitle pb-5 text-xl">
                Turno: {turn}
              </h2>
            </div>

            <div className="flex items-center flex-col sm:flex-row sm:justify-around w-full">
              {players.slice(0, 2).map((elem) => (
                <div
                  key={elem.id}
                >
                  <div
                    onClick={() => playerSelected(elem)}
                    role="button"
                    tabIndex={0}
                    className="flex flex-col justify-center items-center gap-3"
                  >
                    <p className="text-xl font-black">{elem.name}</p>
                    <img
                      src={elem.img}
                      alt={elem.name}
                      className="w-[400px] h-[420px] cursor-pointer hover:scale-105 transition-all duration-200"
                    />
                  </div>
                </div>
              ))}
              {players.length === 0 && nextPool.length === 0 && (
                <div>
                  <p>Nessun altro giocatore — gioco finito</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
