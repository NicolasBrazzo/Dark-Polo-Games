import { useEffect, useState } from "react";
import { ListQuestions } from "../components/ListQuestions";
import { ListRappers } from "../components/ListRappers";
import { RAPPERS } from "../data/rappers";
import { QUESTIONS } from "../data/questions";
import { Sidebar } from "../components/Sidebar";

export const IndovinaChiRapper = () => {
  const [rapperSelected, setRapperSelected] = useState(
    () => RAPPERS[Math.floor(Math.random() * RAPPERS.length)]
  );
  // Id domanda selezionata
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [responseToQuestion, setResponseToQuestion] = useState("");
  const [isModDel, setIsModDel] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [removedRapper, setRemovedRapper] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const allRemovedExceptOne = removedRapper.length === RAPPERS.length - 1;

    if (allRemovedExceptOne) {
      const hasWon = !removedRapper.includes(rapperSelected.id);

      if (hasWon) {
        alert(`Hai vinto! Il rapper era: ${rapperSelected.name}`);
      } else {
        alert(`Hai perso! Il rapper era: ${rapperSelected.name}`);
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
      <Sidebar open={isSidebarOpen} setOpening={setIsSidebarOpen} />
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
