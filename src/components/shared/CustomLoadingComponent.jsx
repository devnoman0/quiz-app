import React from "react";
import { Card, Spin } from "antd";

export default function CustomLoadingComponent() {
  return (
    <Card style={{ marginTop: 50 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 40,
        }}
      >
        <Spin spinning={true} tip="Fetching Data..."></Spin>
      </div>
    </Card>
  );
}
