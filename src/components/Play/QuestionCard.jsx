import React, { useContext, useState } from "react";
import { Button, Checkbox, Form, Radio, Space, Spin, Typography } from "antd";

import { RightOutlined } from "@ant-design/icons";
import PlayContext from "../../context/play";
import axios from "axios";
import AlertComponent from "../shared/AlertComponent";

const { Text } = Typography;

export default function QuestionCard({ question }) {
  const [form] = Form.useForm();
  const [answer, setAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [formLoading, setFormLoading] = useState(false);

  const {
    activeQuestionIndex,
    setactiveQuestionIndex,
    setGameEnded,
    setgameProgress,
    quiz,
    setscore,
    score,
  } = useContext(PlayContext);

  const questionHandle = () => {
    if (activeQuestionIndex === 9) {
      setGameEnded(true);
      setgameProgress((prev) => prev + 10);
    } else {
      setgameProgress((prev) => prev + 10);
      setactiveQuestionIndex((prev) => prev + 1);
    }
  };

  const submitAnswer = () => {
    setFormLoading(true);
    axios
      .post(`/api/play/answer/${question?.id}`, {
        quizId: quiz?.id,
        answer: question?.type === 1 ? answer : answers,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data?.answer) {
          setscore((prev) => prev + 1);
        }
        questionHandle();
        setAnswer(null);
        setAnswers([]);
        setFormLoading(false);
      })
      .catch((err) => {
        AlertComponent(err?.response?.data);
        setFormLoading(false);
      });
  };

  const handleSingleAnswer = (value, id) => {
    if (value) {
      setAnswer(id);
    } else {
      setAnswer(null);
    }
  };

  const handleMultipltAnswer = (e, id) => {
    if (e.target.checked) {
      setAnswers((prev) => [...prev, id]);
    } else {
      setAnswers((prev) => prev.filter((item) => item !== id));
    }
  };

  console.log("score", score);

  return (
    <div>
      <div style={{ marginBottom: 10, width: "80%" }}>
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>
          {question?.text}
        </Text>
      </div>

      <Spin spinning={formLoading} tip="Hold on...">
        <Form onFinish={submitAnswer} form={form}>
          {question.type === 1 && (
            <Form.Item
              name="answer"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  {question?.answers?.map((answer, i) => (
                    <Radio
                      key={i}
                      value={answer.option}
                      onChange={(value) => handleSingleAnswer(value, answer.id)}
                    >
                      {answer.option}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Form.Item>
          )}

          {question.type === 0 && (
            <Form.Item name="answer">
              <Space direction="vertical">
                {question?.answers?.map((answer, i) => (
                  <Checkbox
                    key={i}
                    onChange={(e) => handleMultipltAnswer(e, answer.id)}
                    checked={answers.includes(answer.id)}
                  >
                    {answer.option}
                  </Checkbox>
                ))}
              </Space>
            </Form.Item>
          )}

          <div style={{ marginTop: 20 }}>
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  icon={<RightOutlined />}
                  type="danger"
                  htmlType="submit"
                  disabled={answer === null && answers.length === 0}
                >
                  Confirm & Next
                </Button>
              )}
            </Form.Item>
          </div>
        </Form>
      </Spin>
    </div>
  );
}
