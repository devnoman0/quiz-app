import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";

import { Row, Col } from "antd";

import PrivateLayoutComponent from "../../../src/components/Layout/PrivateLayoutComponent";
import AlertComponent from "../../../src/components/shared/AlertComponent";
import DraftedQuizPublishComponent from "../../../src/components/DraeftedQuiz/Edit/PublishComponent";
import DraftedQuizBasicComponent from "../../../src/components/DraeftedQuiz/Edit/BasicInfoComponent";
import DraftedQuizQuestionList from "../../../src/components/DraeftedQuiz/Edit/Questions/QuestionList";
import CustomLoadingComponent from "../../../src/components/shared/CustomLoadingComponent";

export default function EditDraftedQuiz({ quizId }) {
  const router = useRouter();

  const [dataFetchingLoading, setDatFetchingLoading] = useState(true);
  const [quiz, setQuiz] = useState();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setDatFetchingLoading(true);

    axios
      .get(`/api/quiz/detail/${quizId}`)
      .then((res) => {
        setQuiz({ ...res.data, questions: undefined });
        setQuestions(res.data.questions);
        setDatFetchingLoading(false);
      })
      .catch((err) => {
        setDatFetchingLoading(false);
        AlertComponent(err.response?.data);
        router.replace("/drafted-quiz");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  return (
    <PrivateLayoutComponent>
      <Head>
        <title>{quiz?.title}</title>
      </Head>

      {dataFetchingLoading && <CustomLoadingComponent />}

      {!dataFetchingLoading && (
        <Row gutter={24}>
          <Col span={8}>
            <DraftedQuizBasicComponent quiz={quiz} setQuiz={setQuiz} />
            <DraftedQuizPublishComponent quiz={quiz} questions={questions} />
          </Col>
          <Col span={16}>
            <DraftedQuizQuestionList
              quiz={quiz}
              questions={questions}
              setQuestions={setQuestions}
            />
          </Col>
        </Row>
      )}
    </PrivateLayoutComponent>
  );
}

export async function getServerSideProps({ req, resolvedUrl, params, query }) {
  const quizId = params.id;
  return {
    props: { quizId, query },
  };
}
