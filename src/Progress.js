import React from "react";

function Progress({ index, numQuestions, points, maxPoints, answer }) {
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
