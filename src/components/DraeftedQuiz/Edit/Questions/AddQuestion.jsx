import React, { useState } from "react";
import {
  Button,
  Modal,
  Tooltip,
  Form,
  Input,
  Spin,
  Row,
  Col,
  Select,
  Space,
  Switch,
  Alert,
  Typography,
  notification,
} from "antd";

import {
  PlusOutlined,
  RightOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import AlertComponent from "../../../shared/AlertComponent";

const { Option } = Select;
const { Text } = Typography;

export default function AddQuestion({ quiz, setQuestions, questions }) {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [form] = Form.useForm();
  const [formLoading, setFormLoading] = useState(false);

  const [answers, setAnswers] = useState([]);

  //maintain answer type state
  const [answerType, setAnswerType] = useState(null);

  const changeModelVisibility = () => {
    setModalVisibility((prev) => !prev);
  };

  const handleAnswerTypeChange = (value) => {
    setAnswers([]);
    setAnswerType(value);
  };

  const handleOptionAnswer = (value, key) => {
    if (answerType === "1") {
      if (value) {
        setAnswers([key]);
      } else {
        setAnswers([]);
      }
    } else {
      if (value) {
        setAnswers((prev) => [...prev, key]);
      } else {
        setAnswers((prev) => prev.filter((item) => item !== key));
      }
    }
  };

  const addQuestionHandle = (values) => {
    //adjust answer with options
    values?.options?.map((option, i) => {
      option["answer"] = answers.includes(i);
    });

    setFormLoading(true);
    axios
      .post("/api/quiz/question/add-new", { ...values, quizId: quiz?.id })
      .then((res) => {
        setQuestions((prev) => [...prev, res.data]);
        notification["success"]({
          message: "Success",
          description: "New question added succesfully",
        });
        form.resetFields();
        setFormLoading(false);
        changeModelVisibility();
      })
      .catch((err) => {
        console.log(err);
        setFormLoading(false);
        AlertComponent(err?.response?.data);
      });
  };

  return (
    <>
      <Tooltip
        title={
          questions.length === 10
            ? "This quiz already have 10 questions added."
            : "By clicking this button you can add new question in this quiz."
        }
      >
        <Button
          type="ghost"
          icon={<PlusOutlined />}
          onClick={changeModelVisibility}
          disabled={questions.length === 10}
        >
          Add New
        </Button>
      </Tooltip>
      <Modal
        visible={modalVisibility}
        onCancel={changeModelVisibility}
        title="Add New Question"
        footer={null}
        width={750}
      >
        <Spin spinning={formLoading} tip="Submitting...">
          <Form layout="vertical" form={form} onFinish={addQuestionHandle}>
            <Row gutter={10}>
              <Col span={16}>
                <Form.Item
                  label="Question Text"
                  name="text"
                  rules={[
                    {
                      required: true,
                      message: "Please input valid title!",
                    },
                  ]}
                >
                  <Input placeholder="What is your name?" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Answer Type"
                  name="type"
                  rules={[
                    {
                      required: true,
                      message: "Please input valid title!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Single correct answer"
                    onChange={(value) => handleAnswerTypeChange(value)}
                  >
                    <Option value="1">Single correct answer</Option>
                    <Option value="0">Multiple correct answer</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.List
              name="options"
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 2) {
                      return Promise.reject(
                        new Error("Please add at least two options")
                      );
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row
                      gutter={24}
                      key={key}
                      style={{
                        display: "flex",
                        marginBottom: 8,
                        width: "100%",
                      }}
                      align="baseline"
                    >
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, "option"]}
                          rules={[
                            { required: true, message: "Missing option" },
                          ]}
                        >
                          <Input placeholder="Option" />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Space align="baseline">
                          <Form.Item {...restField} name={[name, "answer"]}>
                            <Space>
                              <Switch
                                onChange={(value) =>
                                  handleOptionAnswer(value, key)
                                }
                                checked={answers.includes(key)}
                              />
                              <Text>Right answer ?</Text>
                            </Space>
                          </Form.Item>

                          {fields.length > 2 ? (
                            <MinusCircleOutlined
                              className="dynamic-delete-button"
                              onClick={() => remove(name)}
                              style={{ marginLeft: 20 }}
                            />
                          ) : null}
                        </Space>
                      </Col>
                    </Row>
                  ))}

                  {answerType === null && (
                    <Alert description="Please select answer type field to add options." />
                  )}

                  {answerType !== null && fields.length !== 5 ? (
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add options
                      </Button>
                    </Form.Item>
                  ) : null}

                  <Space>
                    <Form.ErrorList errors={errors} />
                  </Space>
                </>
              )}
            </Form.List>

            <Form.Item>
              <Button
                icon={<RightOutlined />}
                htmlType="submit"
                type="primary"
                disabled={answers.length < 1}
              >
                Save & Next
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
}
