import { useEffect, useState } from "react";
import axios from "axios";

import Head from "next/head";

import { Typography } from "antd";

import PrivateLayoutComponent from "../../src/components/Layout/PrivateLayoutComponent";
import CustomLoadingComponent from "../../src/components/shared/CustomLoadingComponent";
import DraftedQuizList from "../../src/components/DraeftedQuiz/DraftedQuizList";

const { Title } = Typography;

export default function DraftedQuiz() {
  const [draftedQuizes, setDraftedQuizes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get("/api/quiz/drafted-quiz")
      .then((res) => {
        setDraftedQuizes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <PrivateLayoutComponent>
      <Head>
        <title>Quiz App</title>
        <meta name="description" content="Quiz App" />
      </Head>

      <Title level={3} style={{ color: "rgb(84 84 84)" }}>
        Drafted Quiz
      </Title>

      {loading ? (
        <CustomLoadingComponent />
      ) : (
        <DraftedQuizList
          draftedQuizes={draftedQuizes}
          setDraftedQuizes={setDraftedQuizes}
        />
      )}
    </PrivateLayoutComponent>
  );
}
