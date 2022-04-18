import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";

import { Row, Col } from "antd";

import PublicLayoutComponent from "../../src/components/Layout/PublicLayoutComponent";

import CustomLoadingComponent from "../../src/components/shared/CustomLoadingComponent";
import QuizStartCard from "../../src/components/Play/QuizStartCard";
import PlayContext from "../../src/context/play";
import GameContainer from "../../src/components/Play/GameContainer";
import GameResult from "../../src/components/Play/GameResult";

export default function PlayQuiz({ quizId }) {
  const router = useRouter();

  console.log("quizId", quizId);

  const [dataFetchingLoading, setDatFetchingLoading] = useState(true);

  const { quiz, setQuiz, setQuestions, gameStarted, gameEnded } =
    useContext(PlayContext);

  useEffect(() => {
    setDatFetchingLoading(true);
    axios
      .get(`/api/play/detail/${quizId}`)
      .then((res) => {
        setQuiz(res.data);
        setQuestions(res.data.questions);
        setDatFetchingLoading(false);
      })
      .catch((err) => {
        setDatFetchingLoading(false);
        router.replace("/login");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  return (
    <PublicLayoutComponent>
      <Head>
        <title>{quiz?.title}</title>
      </Head>

      {dataFetchingLoading && <CustomLoadingComponent />}

      {!dataFetchingLoading && quiz !== null && (
        <Row gutter={24}>
          <Col span={6}></Col>
          <Col span={12}>
            {!gameStarted && !gameEnded && <QuizStartCard />}
            {gameStarted && !gameEnded && <GameContainer />}
            {gameStarted && gameEnded && <GameResult />}
          </Col>
          <Col span={6}></Col>
        </Row>
      )}
    </PublicLayoutComponent>
  );
}

export async function getServerSideProps({ req, resolvedUrl, params, query }) {
  const quizId = params.id;
  return {
    props: { quizId, query },
  };
}
