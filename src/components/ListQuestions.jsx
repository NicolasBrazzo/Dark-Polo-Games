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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 m-5 sm:m-10 cursor-pointer">
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
              if (usedQuestions.length >= 10) return;
              if (usedQuestions.includes(question.id)) return;
              setSelectedQuestion(question.id);
            }}
          >
            <p>{question.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
