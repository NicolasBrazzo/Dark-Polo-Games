import { Sidebar } from "../components/Sidebar";
import { ALBUMS } from "../data/albumYear";
import { useEffect, useState } from "react";

export const GuessAlbumYear = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [indexAlbum, setIndexAlbum] = useState(0);
  const [choice, setChoice] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [counterAnswerCorrect, setCounterAnswerCorrect] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const album = ALBUMS[indexAlbum];
  const NUMBERQUESTIONS = ALBUMS.length;

  const checkAnswer = (id) => {
    setLoading(true)
    console.log(id);
    if (!id) return;
    if (id === album.year) {
      setIsCorrect(true);
      setCounterAnswerCorrect(counterAnswerCorrect + 1);
    } else {
      setIsCorrect(false);
    }
    
    setTimeout(() => {
      setIndexAlbum(indexAlbum + 1);
      if(indexAlbum >= NUMBERQUESTIONS) {
        setIsGameFinished(true);
      }
      setIsCorrect(null);
      setLoading(false);
    }, 1500);

    setChoice(null);
  };
  
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
        <div className="text-center mt-3 text-[20px] text-muted">Caricamento...</div>
      )}

      {!isGameFinished ? (

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
                    choice === option ? "btn-secondary-selected" : "btn-secondary"
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
                <div className="btn-primary" onClick={() => checkAnswer(choice)}>
                  Verifica
                </div>
              </div>
            )}

            {isCorrect !== null &&
              (isCorrect ? (
                <p className="md:text-[18px] text-green-400 xl:max-w-[10vw] lg:max-w-[20vw] text-center">
                  Corretto, l'album <span className="text-[20px] font-bold">{album.title}</span> è uscito il: {album.releaseDate}
                </p>
              ) : ( 
                <p className="md:text-[18px] text-red-400 xl:max-w-[10vw] lg:max-w-[20vw] text-center">
                  Errato, l'album <span className="text-[20px] font-bold">{album.title}</span> è uscito il: {album.releaseDate}
                </p>
              ))}
          </div>
        </div>
      ) : 
      (
        <div>
          gioco finito
        </div>
      )}
    </div>
  );
};
