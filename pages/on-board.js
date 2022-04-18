import { useEffect, useState, useContext } from "react";
import axios from "axios";

import Head from "next/head";

import { Typography } from "antd";

import PrivateLayoutComponent from "../src/components/Layout/PrivateLayoutComponent";
import CustomLoadingComponent from "../src/components/shared/CustomLoadingComponent";
import PublishedQuizList from "../src/components/PublishedQuiz/PublishedQuizList";
import UserContext from "../src/context/user";

const { Title } = Typography;

export default function OnBoard() {
  const { user } = useContext(UserContext);

  const [publishedQuizes, setPublishedQuizes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get("/api/quiz/published-quiz")
      .then((res) => {
        setPublishedQuizes(res.data);
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
        Welcome, {user?.firstName} !
      </Title>

      {loading ? (
        <CustomLoadingComponent />
      ) : (
        <PublishedQuizList
          publishedQuizes={publishedQuizes}
          setPublishedQuizes={setPublishedQuizes}
        />
      )}
    </PrivateLayoutComponent>
  );
}
