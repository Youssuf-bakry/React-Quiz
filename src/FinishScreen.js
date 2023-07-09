import React from "react";

function FinishScreen({ points, maxPoints, maxSCore }) {
  const percentage = (points / maxPoints) * 100;
  // const lastHighScore =
  let emoji;

  if (percentage >= 85) emoji = "🎽";
  if (percentage >= 70 && percentage < 85) emoji = "🥇";
  if (percentage >= 60 && percentage < 70) emoji = "🧁";
  if (percentage >= 50 && percentage < 60) emoji = "🙂";
  if (percentage < 50) emoji = "👎";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You Scored <strong>{points}</strong> / {maxPoints} (
        {Math.ceil(percentage)} %)
      </p>
      <p className="highscore">Max score is : {maxSCore}</p>
    </>
  );
}

export default FinishScreen;
