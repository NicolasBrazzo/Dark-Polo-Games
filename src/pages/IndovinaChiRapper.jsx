import { useEffect, useState } from "react";
import { ListQuestions } from "../components/ListQuestions";
import { ListRappers } from "../components/ListRappers";
import { RAPPERS } from "../data/rappers";
import { QUESTIONS } from "../data/questions";
import { Sidebar } from "../components/Sidebar";

const max = 20;

export const IndovinaChiRapper = () => {
  const [rapperSelected, setRapperSelected] = useState(
    () => RAPPERS[Math.floor(Math.random() * RAPPERS.length)]
  );
  // Id domanda selezionata
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [responseToQuestion, setResponseToQuestion] = useState("");
  const [isModDel, setIsModDel] = useState(false);
  const [removedRapper, setRemovedRapper] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);

  // DA FIXARE, manca la parte che ti dice che rapper era un po' più carino;

  useEffect(() => {
    const allRemovedExceptOne = removedRapper.length === max - 1;

    if (allRemovedExceptOne) {
      setIsGameFinished(true);
      const hasWon = !removedRapper.includes(rapperSelected.id);

      if (hasWon) {
        alert(`Hai vinto! Il rapper era: ${rapperSelected.name}`);
      } else {
        alert(`Hai perso! Il rapper era: ${rapperSelected.name}`);
      }
    }
  }, [removedRapper, rapperSelected]);


  if (isGameFinished) {
    setRemovedRapper([]);
    setUsedQuestions([]);
    setResponseToQuestion("");
  }


  const checkAnsware = (question) => {
    console.log(question);
    console.log(rapperSelected[question]);
    setResponseToQuestion(rapperSelected[question] ? "Si" : "No");
    setSelectedQuestion(false);
  };

  return (
    <div>
      <div className="flex items-center">
        <Sidebar open={isSidebarOpen} setOpening={setIsSidebarOpen} />
        <h1 className="neon-subtitle underline">Indovina chi Rapper</h1>
      </div>
      <div>
        <ListRappers
          rappers={RAPPERS}
          isModDel={isModDel}
          setIsModDel={setIsModDel}
          removedRapper={removedRapper}
          setRemovedRapper={setRemovedRapper}
          maxRappersBoard={max}
        />

        <div className="card-utility w-fit m-10">
          <p>Hai ancora {10 - usedQuestions.length} domande</p>
        </div>

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
