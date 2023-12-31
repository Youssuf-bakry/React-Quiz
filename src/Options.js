import React from "react";
import { useQuiz } from "./contexts/quizContext";

function Options() {
  const { index, questions, answer, dispatch } = useQuiz();
  const hasAnswered = answer !== null;
  const question = questions[index];
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "selectAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
