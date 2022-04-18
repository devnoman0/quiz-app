import React from "react";

import { Card, Typography, Button, Space, Empty } from "antd";

import { ArrowRightOutlined } from "@ant-design/icons";
import AddQuestion from "./AddQuestion";
import QuestionCardComponent from "./QuestionCardComponent";

const { Text } = Typography;

export default function DraftedQuizQuestionList({
  quiz,
  questions,
  setQuestions,
}) {
  return (
    <Card
      title="Questions"
      extra={
        <AddQuestion
          quiz={quiz}
          setQuestions={setQuestions}
          questions={questions}
        />
      }
    >
      {questions?.length === 0 && (
        <Empty description="There is no questions founded for this quiz." />
      )}

      {questions?.length !== 0 &&
        questions.map((question, i) => (
          <QuestionCardComponent
            key={i}
            question={question}
            style={{ marginBottom: questions.length !== i + 1 ? 24 : 0 }}
          />
        ))}
    </Card>
  );
}
