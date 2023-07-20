import React from "react";
import Options from "./Options";
import { useQuiz } from "./contexts/quizContext";

function Questions() {
  const { index, questions, dispatch } = useQuiz();
  const question = questions[index];
  return (
    <>
      <h3 className="">{question.question}</h3>
      <Options dispatch={dispatch} />
    </>
  );
}

export default Questions;
