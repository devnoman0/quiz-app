import React from "react";
import { Row, Col, Empty, Card } from "antd";
import PublishedQuizCard from "../Quiz/PublishedQuizCard";

export default function PublishedQuizList({
  publishedQuizes,
  setPublishedQuizes,
}) {
  if (publishedQuizes.length === 0)
    return (
      <Card style={{ marginTop: 40 }}>
        <Empty description="Seems there is no published quiz" />
      </Card>
    );
  return (
    <Row gutter={24} style={{ marginTop: 24 }}>
      {publishedQuizes?.map((item) => (
        <Col span={8} key={item.id}>
          <PublishedQuizCard
            quiz={item}
            setPublishedQuizes={setPublishedQuizes}
          />
        </Col>
      ))}
    </Row>
  );
}
