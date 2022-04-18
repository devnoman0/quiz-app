import React, { useState } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  Card,
  Typography,
  Badge,
  Popconfirm,
  notification,
  message,
  Spin,
} from "antd";
import { ShareAltOutlined, DeleteOutlined } from "@ant-design/icons";
import AlertComponent from "../shared/AlertComponent";
import { frontendUrl } from "../utils/settings";

const { Title, Paragraph } = Typography;

export default function PublishedQuizCard({ quiz, setPublishedQuizes }) {
  const [loading, setloading] = useState(false);

  const deletehHandle = () => {
    setloading(true);
    axios
      .post(`/api/quiz/delete/`, { quizId: quiz?.id })
      .then((res) => {
        console.log(res.data);
        setPublishedQuizes((prev) =>
          prev.filter((item) => item.id !== quiz?.id)
        );
        setloading(false);
        notification["success"]({
          message: "Success",
          description: "Quiz successfully deleted!",
        });
      })
      .catch((err) => {
        AlertComponent(err?.response?.data);
        setloading(false);
      });
  };

  const shareHandle = () => {
    message.success(
      `${frontendUrl}/play/${quiz?.slug} is copied to clipboard.`
    );
  };

  return (
    <Spin spinning={loading}>
      <Card
        style={{ marginBottom: 24 }}
        actions={[
          <CopyToClipboard
            key="share"
            onCopy={shareHandle}
            text={`${frontendUrl}/play/${quiz?.slug}`}
          >
            <ShareAltOutlined />
          </CopyToClipboard>,
          <Popconfirm
            key="delete"
            onConfirm={deletehHandle}
            title="Are you sure, you want to delete?"
          >
            <DeleteOutlined />
          </Popconfirm>,
        ]}
      >
        <Title level={4} style={{ color: "rgb(84 84 84)" }}>
          {quiz?.title}
        </Title>
        <Paragraph style={{ color: "rgb(84 84 84)" }}>
          {quiz?.description}
        </Paragraph>

        <Badge count="Published" style={{ backgroundColor: "#52c41a" }} />
      </Card>
    </Spin>
  );
}
