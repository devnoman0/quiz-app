import { Card, Space, Radio, Checkbox } from "antd";
import React from "react";

export default function QuestionCardComponent({ question, style }) {
  return (
    <Card hoverable title={question?.text} style={style}>
      {question.type === 1 && (
        <Space>
          {question?.answers?.map((answer, i) => (
            <Radio key={i} value={answer.option} checked={answer.isAnswer}>
              {answer.option}
            </Radio>
          ))}
        </Space>
      )}

      {question.type === 0 && (
        <Space>
          {question?.answers?.map((answer, i) => (
            <Checkbox key={i} checked={answer.isAnswer}>
              {answer.option}
            </Checkbox>
          ))}
        </Space>
      )}
    </Card>
  );
}
