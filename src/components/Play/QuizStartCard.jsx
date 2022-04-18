import React, { useContext } from "react";
import { Button, Card, Divider, Typography } from "antd";

import { PlayCircleOutlined } from "@ant-design/icons";

import PlayContext from "../../context/play";

const { Title, Paragraph, Text } = Typography;

export default function QuizStartCard() {
  const { quiz, setGameStarted } = useContext(PlayContext);

  return (
    <Card
      title="Awesome, Lets Start Playing!"
      headStyle={{ textAlign: "center" }}
      bodyStyle={{ textAlign: "center" }}
    >
      <Title level={4}>{quiz?.title}</Title>
      <Paragraph style={{ color: "rgb(84 84 84)" }}>
        {quiz?.description}
      </Paragraph>
      <Divider />

      <Paragraph style={{ marginTop: 10 }} disabled>
        <Text mark>Help</Text> : This quiz has total 10 questions. And each
        question has atleast tow option. There are two types of answer you can
        input. #1.Single answer, #2.Multiple answer. After selecting an answer
        you need to press next button to see the next question. Once you press
        the next button you wont have option go back.
      </Paragraph>
      <Paragraph>
        <Text mark>
          If you found a multiple answers question, you must need to check all
          the correct answers to get valid result.
        </Text>
      </Paragraph>
      <Button
        icon={<PlayCircleOutlined />}
        type="danger"
        onClick={() => setGameStarted(true)}
      >
        Lets Play
      </Button>
    </Card>
  );
}
