export const ListQuestions = ({
  questions,
  selectedQuestion,
  setSelectedQuestion,
  checkAnsware,
  setIsModDel,
  usedQuestions,
  setUsedQuestions,
}) => {
  return (
    <div>
      <div className="flex justify-center gap-5 m-15 cursor-pointer">
        {questions.map((question) => (
          <div
            key={question.id}
            className={
              usedQuestions.includes(question.id)
                ? "card-questions-used"
                : selectedQuestion === question.id
                ? "card-questions-selected"
                : "card-questions"
            }
            onClick={() => {
              if(usedQuestions.includes(question.id)) return;
              setSelectedQuestion(question.id)}
            }
          >
            <p>{question.text}</p>
          </div>
        ))}
      </div>
      {selectedQuestion && (
        <div className="text-center m-5">
          <button
            className="btn-primary m-5"
            onClick={() => {
              setUsedQuestions([...usedQuestions, selectedQuestion]);
              setIsModDel(true);
              checkAnsware(selectedQuestion);
            }}
          >
            Chiedi
          </button>
        </div>
      )}
    </div>
  );
};
