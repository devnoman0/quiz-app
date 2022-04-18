import React, { useContext } from "react";
import { useRouter } from "next/router";

import { Card, Divider, Progress, Result, Button } from "antd";

import PlayContext from "../../context/play";

export default function GameResult() {
  const router = useRouter();

  const { score, gameProgress, questions } = useContext(PlayContext);

  const restart = () => {
    router.reload(window.location.pathname);
  };

  return (
    <Card title="Awesome Play Mate !!" headStyle={{ textAlign: "center" }}>
      <Result
        status="success"
        subTitle="You have successfully completed the quiz!"
        title={`”You answered ${score}/${questions?.length} questions correctly”`}
        extra={[
          <Button type="primary" key="console" onClick={restart}>
            Play Again
          </Button>,
        ]}
      />
      <Divider />
      <Progress percent={gameProgress} status="active" />
    </Card>
  );
}
