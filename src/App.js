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
import { useQuiz } from "./contexts/quizContext";

function App() {
  const { status, dispatch } = useQuiz();
  // const numQuestions = questions.length;

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Questions />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}

        {status === "finished" && (
          <>
            <FinishScreen />
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
