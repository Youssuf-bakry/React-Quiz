import { createContext, useContext, useEffect, useReducer } from "react";

//*Create Context
const quizContext = createContext();

//*Using Reducer
const initialState = {
  questions: [],

  //loading,failed,ready,active,finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  maxSCore: 0,
  secondsRemaining: null,
  numQuestions: 0,
};
const Secs_Per_Question = 30;
function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        numQuestions: state.questions.length,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "failed",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * Secs_Per_Question,
      };
    case "selectAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        maxSCore: state.points > state.maxSCore ? state.points : state.maxSCore,
      };
    case "reset":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        maxSCore: state.maxSCore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action Unknown");
  }
}

const QuizProvider = function ({ children }) {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      maxSCore,
      secondsRemaining,
      numQuestions,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const maxPoints = questions
    .map((q) => q.points)
    .reduce((a, b) => {
      return a + b;
    }, 0);

  //! why this is not working عرفت هههه
  // questions.reduce((a, b) => {
  //   return a.points + b.points;
  // }, 0);

  useEffect(function () {
    // fetch("http://localhost:9000/questions")
    fetch(
      "https://my-json-server.typicode.com/youssuf-bakry/reactquiz./questions"
    )
      // {
      //   headers: { "access-control-allow-origin": "*" },
      // }

      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <quizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        maxSCore,
        secondsRemaining,
        numQuestions,
        maxPoints,
        dispatch,
      }}
    >
      {children}
    </quizContext.Provider>
  );
};

const useQuiz = function () {
  const context = useContext(quizContext);
  if (context === undefined)
    throw new Error("context used outside of its scope");
  return context;
};

export { useQuiz, QuizProvider };
