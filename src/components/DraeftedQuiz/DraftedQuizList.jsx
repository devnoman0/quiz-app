import React from "react";
import { Row, Col, Empty, Card } from "antd";
import DraftedQuizCard from "../Quiz/DraftedQuizCard";

export default function DraftedQuizList({ draftedQuizes, setDraftedQuizes }) {
  if (draftedQuizes.length === 0)
    return (
      <Card style={{ marginTop: 40 }}>
        <Empty description="Seems there is no drafted quiz" />
      </Card>
    );
  return (
    <Row gutter={24} style={{ marginTop: 24 }}>
      {draftedQuizes?.map((item) => (
        <Col span={8} key={item.id}>
          <DraftedQuizCard quiz={item} setDraftedQuizes={setDraftedQuizes} />
        </Col>
      ))}
    </Row>
  );
}
