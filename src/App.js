import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const initialState = {
  questions: [],
  //loading,failed,ready,active,finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  maxSCore: 0,
  secondsRemaining: null,
};
const Secs_Per_Question = 30;
function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
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
    // return {
    //   ...state,
    //   status: "ready",
    //   points: 0,
    //   answer: null,
    //   index: 0,
    // };
    default:
      throw new Error("Action Unknown");
  }
}
function App() {
  const [
    { questions, status, index, answer, points, maxSCore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;

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
    fetch("../data/questions.json")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              maxPoints={maxPoints}
              index={index}
              numQuestions={numQuestions}
              points={points}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
              status={status}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {/* {answer !== null && (
          <NextButton
            dispatch={dispatch}
            index={index}
            numQuestions={numQuestions}
          />
        )} */}
        {status == "finished" && (
          <>
            <FinishScreen
              points={points}
              maxPoints={maxPoints}
              maxSCore={maxSCore}
            />
            <button
              className="btn btn-ui"
              onClick={() => dispatch({ type: "reset" })}
            >
              Retake the test
            </button>
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
