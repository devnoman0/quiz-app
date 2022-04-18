import React, { useState } from "react";

const PlayContext = React.createContext();

export const PlayProvider = (props) => {
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [activeQuestionIndex, setactiveQuestionIndex] = useState(0);
  const [gameProgress, setgameProgress] = useState(0);
  const [score, setscore] = useState(0);

  return (
    <PlayContext.Provider
      value={{
        quiz,
        setQuiz,
        questions,
        setQuestions,
        gameStarted,
        gameEnded,
        setGameEnded,
        setGameStarted,
        activeQuestionIndex,
        setactiveQuestionIndex,
        gameProgress,
        setgameProgress,
        score,
        setscore,
      }}
    >
      {props.children}
    </PlayContext.Provider>
  );
};

export default PlayContext;
