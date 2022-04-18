import React, { useContext, useState } from "react";
import { Card, Divider, Progress } from "antd";

import PlayContext from "../../context/play";
import QuestionCard from "./QuestionCard";

export default function GameContainer() {
  const { quiz, activeQuestionIndex, questions, gameProgress } =
    useContext(PlayContext);

  // useEffect(() => {}, [activeQuestionIndex]);

  return (
    <Card title="You are doing nice!" headStyle={{ textAlign: "center" }}>
      <QuestionCard question={questions[activeQuestionIndex]} />

      <Divider />
      <Progress percent={gameProgress} status="active" />
    </Card>
  );
}
