import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";

import { Card, Typography, Badge, Spin, Popconfirm, notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import AlertComponent from "../shared/AlertComponent";

const { Title, Paragraph } = Typography;

export default function DraftedQuizCard({ quiz, setDraftedQuizes }) {
  const [loading, setloading] = useState(false);

  const deletehHandle = () => {
    setloading(true);
    axios
      .post(`/api/quiz/delete/`, { quizId: quiz?.id })
      .then((res) => {
        console.log(res.data);
        setDraftedQuizes((prev) => prev.filter((item) => item.id !== quiz?.id));
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

  return (
    <Spin spinning={loading}>
      <Card
        style={{ marginBottom: 24 }}
        actions={[
          <Link href={`/drafted-quiz/edit/${quiz?.id}`} key="edit">
            <a>
              <EditOutlined />
            </a>
          </Link>,
          <Popconfirm
            key="delete"
            onConfirm={deletehHandle}
            title="Are you sure, you want to delete?"
          >
            <DeleteOutlined />
          </Popconfirm>,
        ]}
      >
        <Link href={`/drafted-quiz/edit/${quiz?.id}`}>
          <a>
            <Title level={4} style={{ color: "#1890ff" }}>
              {quiz?.title}
            </Title>
          </a>
        </Link>
        <Paragraph style={{ color: "rgb(84 84 84)" }}>
          {quiz?.description}
        </Paragraph>
        <Badge count="Drafted" style={{ backgroundColor: "#f50" }} />
      </Card>
    </Spin>
  );
}
