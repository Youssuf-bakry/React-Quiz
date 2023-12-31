import React from "react";
import { useQuiz } from "./contexts/quizContext";

function Progress() {
  const { index, numQuestions, points, maxPoints, answer } = useQuiz();
  return (
    <header className="progress">
      <progress
        min="0"
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <div>
        Question <strong>{index + 1}</strong>/{numQuestions}
      </div>
      <div>
        <strong>{points}</strong> / {maxPoints} Points
      </div>
    </header>
  );
}

export default Progress;
