import React, { useState } from "react";

import { Card, Button, Form, Input, Spin, notification } from "antd";

import { RightOutlined } from "@ant-design/icons";
import axios from "axios";
import AlertComponent from "../../shared/AlertComponent";

const { TextArea } = Input;

export default function DraftedQuizBasicComponent({ quiz, setQuiz }) {
  const [form] = Form.useForm();
  const [formLoading, setFormLoading] = useState(false);

  form.setFieldsValue(quiz);

  const updateQuizHandle = (values) => {
    setFormLoading(true);

    axios
      .post("/api/quiz/update", { ...values, quizId: quiz?.id })
      .then((res) => {
        console.log(res.data);
        setQuiz((prev) => ({
          ...prev,
          title: res.data.title,
          description: res.data.description,
        }));
        notification["success"]({
          message: "Success",
          description: "Quiz basic details updated successfull.",
        });
        setFormLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setFormLoading(false);
        AlertComponent(err?.response?.data);
      });
  };

  return (
    <Card title="Update Details">
      <Spin spinning={formLoading} tip="Updating...">
        <Form layout="vertical" form={form} onFinish={updateQuizHandle}>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input valid title!",
              },
            ]}
            initialValue={quiz?.title}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            initialValue={quiz?.description}
          >
            <TextArea
              placeholder="A small detail about this quiz"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
          <Button icon={<RightOutlined />} htmlType="submit" type="primary">
            Save & Next
          </Button>
        </Form>
      </Spin>
    </Card>
  );
}
