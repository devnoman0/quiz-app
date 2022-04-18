import React, { useState } from "react";

import { Card, Typography, Button, Space, Spin } from "antd";

import { ArrowRightOutlined } from "@ant-design/icons";
import axios from "axios";
import AlertComponent from "../../shared/AlertComponent";
import { useRouter } from "next/router";

const { Text } = Typography;

export default function DraftedQuizPublishComponent({ questions, quiz }) {
  const route = useRouter();

  const [loading, setloading] = useState(false);

  const publishHandle = () => {
    setloading(true);
    axios
      .post(`/api/quiz/publish/`, { quizId: quiz?.id })
      .then((res) => {
        console.log(res.data);
        route.replace("/on-board");
        setloading(false);
      })
      .catch((err) => {
        AlertComponent(err?.response?.data);
        setloading(false);
      });
  };

  return (
    <Card title="Publishing" style={{ marginTop: 24 }}>
      <Spin
        spinning={loading}
        tip="Hold tight - we are publishing you awesome quiz."
      >
        <Space>
          <Text>
            This quiz is not published yet and that means you {"can't"} share
            this quiz with anyone to participate. Please publish this quiz to
            get a shareable link. And{" "}
            <Text mark>to publish this quiz pleas add 10 questions</Text> if you{" "}
            {"didn't"} add yet.
          </Text>
        </Space>
        <Button
          onClick={publishHandle}
          type="primary"
          style={{ marginTop: 24 }}
          icon={<ArrowRightOutlined />}
          disabled={questions?.length !== 10}
        >
          Publish This Quiz
        </Button>
      </Spin>
    </Card>
  );
}
