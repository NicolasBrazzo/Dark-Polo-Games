import { Sidebar } from "../components/Sidebar";
import { useEffect, useMemo, useState } from "react";
import { RAPPERS } from "../data/rappers";

export const Uwufufu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [numberElements, setNumberElements] = useState(8);
  const [genreSelected, setGenreSelected] = useState("trap");

  const [players, setPlayers] = useState([]);

  const [deletedRappers, setDeletedRappers] = useState([]);
  const [nextPool, setNextPool] = useState([]);

  useEffect(() => {
    console.log(players);
  }, [players, nextPool]);

  // helper: Fisher-Yates shuffle in place (ritorna una copia shuffled)
  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const insertPlayer = (number, genre) => {
    const filtered = RAPPERS.filter(
      (rapper) => Array.isArray(rapper.genre) && rapper.genre.includes(genre)
    );

    const shuffled = shuffle(filtered);
    const take =
      typeof number === "number" ? shuffled.slice(0, number) : shuffled;

    setPlayers((prev) => [...prev, ...take]);
  };

  const playerSelected = (rapper) => {
    setNextPool([...nextPool, rapper]);
    setPlayers([...players.filter((elem) => elem.id !== rapper.id)]);
  };

  return (
    <div>
      <div className="flex items-center">
        <Sidebar open={isSidebarOpen} setOpening={setIsSidebarOpen} />
        <h1 className="neon-subtitle underline">Indovina l'anno degli album</h1>
      </div>
      <div className="flex justify-center items-center mt-20">
        {!isGameStarted ? (
          <div className="card flex flex-col gap-5">
            <h1>Opzioni</h1>
            <div className="flex gap-4">
              <label htmlFor="genre">Seleziona il genere</label>
              <select
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

            <div className="flex gap-4">
              <label htmlFor="numberSelected">Imposta quanti giocatori</label>
              <select
                name="numberSelected"
                id="numberSelected
              "
                value={numberElements}
                onChange={(e) => setNumberElements(e.currentTarget.value)}
              >
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="32">32</option>
              </select>
            </div>
            <div>
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
          <div className="card">
            <div className="flex items-center justify-center gap-3">
              {players.slice(0, 2).map((elem, key) => (
                <div key={key} onClick={() => playerSelected(elem)}>
                  <h1>{elem.name}</h1>
                  <img src={elem.img} alt="" className="w-[200px]" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
