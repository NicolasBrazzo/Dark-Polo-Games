import { useEffect, useState } from "react";
import { ListQuestions } from "../components/ListQuestions";
import { ListRappers } from "../components/ListRappers";
import { RAPPERS } from "../data/rappers";
import { QUESTIONS } from "../data/questions";

export const IndovinaChiRapper = () => {
  // Id domanda selezionata
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [responseToQuestion, setResponseToQuestion] = useState("");
  const [isModDel, setIsModDel] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [rapperSelected, setRapperSelected] = useState(
    () => RAPPERS[Math.floor(Math.random() * RAPPERS.length)]
  );
  const [removedRapper, setRemovedRapper] = useState([]);

  console.log(rapperSelected);

  useEffect(() => {
    const allRemovedExceptOne = removedRapper.length === RAPPERS.length - 1;

    if (allRemovedExceptOne) {
      const hasWon = !removedRapper.includes(rapperSelected.id);

      if (hasWon) {
        alert("Hai vinto! Il rapper era:", rapperSelected.name);
      } else {
        alert("HAi perso, il rapper era:", rapperSelected.name);
      }
      // reset logico del gioco
      setRemovedRapper([]);
      setUsedQuestions([]);
      setResponseToQuestion("");
    }
  }, [removedRapper, rapperSelected]);

  const checkAnsware = (question) => {
    console.log(question);
    console.log(rapperSelected[question]);
    setResponseToQuestion(rapperSelected[question] ? "Si" : "No");
    setSelectedQuestion(false);
  };

  return (
    <div>
      <div className="m-5">
        <div className="panel">
          <h1 className="neon-title">Indovina chi Rapper</h1>
          <div className="text-muted">
            Questo gioco funziona esattamente come indovina chi, solo con i
            Rapper
          </div>
          <div className="flex items-center gap-5 mt-4">
            <div className="card">
              <h2 className="neon-subtitle">Funzionamento:</h2>
              <ol>
                <li className="text-normal">1 - Seleziona la domanda</li>
                <li className="text-normal">
                  2 - Chiedi la domanda selezionata
                </li>
                <li className="text-normal">3 - Vedi la risposta</li>
                <li className="text-normal">4 - Elimina i rapper</li>
              </ol>
            </div>
            <div className="card">
              <h2 className="neon-subtitle">Regole:</h2>
              <ul>
                <li className="text-normal">
                  Puoi escludere i rapper solo dopo aver visto la risposta
                </li>
                <li className="text-normal">
                  Non puoi rifare la stessa domanda più di una volta
                </li>
                <li className="text-normal">
                  Quenado elimini un rapper puoi rimetterlo in gioco
                </li>
                <li className="text-normal">
                  Hai massimo 10 domande tra quelle disponibili
                </li>
              </ul>
            </div>

            <div className="card">
              <h2 className="neon-subtitle">Ricomincia</h2>
              <button className="btn-primary">Restart</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ListRappers
          rappers={RAPPERS}
          isModDel={isModDel}
          setIsModDel={setIsModDel}
          removedRapper={removedRapper}
          setRemovedRapper={setRemovedRapper}
        />
        {responseToQuestion && (
          <p className="neon-subtitle text-center m-20">
            Risposta: {responseToQuestion}
          </p>
        )}
        <ListQuestions
          questions={QUESTIONS}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
          checkAnsware={checkAnsware}
          setIsModDel={setIsModDel}
          usedQuestions={usedQuestions}
          setUsedQuestions={setUsedQuestions}
        />
      </div>
    </div>
  );
};
