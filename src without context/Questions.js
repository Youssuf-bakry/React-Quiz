import React from "react";
import Options from "./Options";

function Questions({ question, answer, dispatch }) {
  return (
    <>
      <h3 className="">{question.question}</h3>
      <Options question={question} answer={answer} dispatch={dispatch} />
    </>
  );
}

export default Questions;
