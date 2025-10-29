import { Link } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { ALBUMS } from "../data/albumYear";
import { useState } from "react";

export const GuessAlbumYear = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [indexAlbum, setIndexAlbum] = useState(0);
  const [choice, setChoice] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [counterAnswerCorrect, setCounterAnswerCorrect] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const NUMBERQUESTIONS = ALBUMS.length;
  const album =
    indexAlbum >= 0 && indexAlbum < NUMBERQUESTIONS ? ALBUMS[indexAlbum] : null;

  const checkAnswer = (id) => {
    if (loading || isGameFinished) return;
    setLoading(true);

    if (id === null) {
      setLoading(false);
      return;
    }

    const correct = id === album.year;
    setIsCorrect(correct);
    if (correct) setCounterAnswerCorrect((prev) => prev + 1);

    const nextIndex = indexAlbum + 1;

    setTimeout(() => {
      if (nextIndex >= NUMBERQUESTIONS) {
        setIsGameFinished(true);
      } else {
        setIndexAlbum(nextIndex);
      }
      setIsCorrect(null);
      setChoice(null);
      setLoading(false);
    }, 1500);
  };

  if (isGameFinished) {
    return (
      <div>
        <div className="flex items-center">
          <Sidebar open={isSidebarOpen} setOpening={setIsSidebarOpen} />
          <h1 className="neon-subtitle underline">
            Indovina l'anno degli album
          </h1>
        </div>

        <div className="text-center p-12">
          <h2 className="text-3xl font-bold mb-4">Gioco finito</h2>
          <p>
            Hai risposto correttamente a {counterAnswerCorrect} su{" "}
            {NUMBERQUESTIONS}.
            {counterAnswerCorrect >= 12 ? <p>Hai vinto</p> : <p>hai perso</p>}
          </p>
          <div className="mt-6 flex justify-center items-center gap-3">
            <button
              className="btn-primary"
              onClick={() => {
                setIndexAlbum(0);
                setChoice(null);
                setIsCorrect(null);
                setCounterAnswerCorrect(0);
                setIsGameFinished(false);
              }}
            >
              Ricomincia
            </button>

            <Link to={"/"}>
              <button className="btn-secondary">Torna alla Home</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center">
        <Sidebar open={isSidebarOpen} setOpening={setIsSidebarOpen} />
        <h1 className="neon-subtitle underline">Indovina l'anno degli album</h1>
      </div>

      <div className="text-center md:text-2xl  font-black panel w-fit mx-auto">
        Risposte corrette: {counterAnswerCorrect}
      </div>

      {loading && (
        <div className="text-center mt-3 text-[20px] text-muted">
          Caricamento...
        </div>
      )}

      {album ? (
        <div className="md:flex text-center md:justify-center gap-20 items-center m-20 min-h-[500px]">
          <div className="moving-bg"></div>
          {/* Album titolo + img */}
          <div className="text-center">
            <h2 className="sm:text-3xl text-xl font-bold m-2">{album.title}</h2>
            <div className="w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] mx-auto">
              <img src={album.image} alt="" />
            </div>
          </div>

          {/* Album info + opzioni */}
          <div className="flex flex-col gap-2 items-center">
            <div className="card mt-4">
              <h2 className="md:text-2xl text-xl">
                Artista/i: <span className="font-bold">{album.artist}</span>
              </h2>
              <p className="md:text-2xl text-xl">
                Genere/i:{" "}
                {album.genre.map((genreSingle, key) => (
                  <span key={key} className="px-1 font-bold">
                    {genreSingle}
                  </span>
                ))}
              </p>
            </div>
            <div className="flex justify-center items-center m-3">
              {album.options.map((option, key) => (
                <div
                  className={`${
                    choice === option
                      ? "btn-secondary-selected"
                      : "btn-secondary"
                  } text-2xl m-2 cursor-pointer`}
                  key={key}
                  onClick={() => setChoice(option)}
                >
                  {option}
                </div>
              ))}
            </div>

            {choice !== null && (
              <div>
                <div
                  className="btn-primary"
                  onClick={() => checkAnswer(choice)}
                >
                  Verifica
                </div>
              </div>
            )}

            {isCorrect !== null &&
              (isCorrect ? (
                <p className="md:text-[18px] text-green-400 xl:max-w-[10vw] lg:max-w-[20vw] text-center">
                  Corretto, l'album{" "}
                  <span className="text-[20px] font-bold">{album.title}</span> è
                  uscito il: {album.releaseDate}
                </p>
              ) : (
                <p className="md:text-[18px] text-red-400 xl:max-w-[10vw] lg:max-w-[20vw] text-center">
                  Errato, l'album{" "}
                  <span className="text-[20px] font-bold">{album.title}</span> è
                  uscito il: {album.releaseDate}
                </p>
              ))}
          </div>
        </div>
      ) : (
        <div className="text-center p-8">Album non trovato</div>
      )}
    </div>
  );
};
