import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { Modal, Button, Form, Input, Spin, notification } from "antd";
import { PlusCircleOutlined, RightOutlined } from "@ant-design/icons";

import AlertComponent from "../shared/AlertComponent";

const { TextArea } = Input;

export default function AddNewQuiz() {
  const router = useRouter();

  const [modalVisibility, setModalVisibility] = useState(false);
  const [form] = Form.useForm();
  const [formLoading, setFormLoading] = useState(false);

  const changeModelVisibility = () => {
    setModalVisibility((prev) => !prev);
  };

  const addQuizHandle = (values) => {
    setFormLoading(true);

    axios
      .post("/api/quiz/add-new", values)
      .then((res) => {
        console.log(res.data);
        notification["success"]({
          message: "Success",
          description: "Quiz added successfully",
        });
        changeModelVisibility();
        router.replace(`/drafted-quiz/edit/${res.data.id}`);
        setFormLoading(false);
      })
      .catch((err) => {
        AlertComponent(err.response?.data);
        setFormLoading(false);
      });
  };

  return (
    <>
      <Button
        type="primary"
        style={{ marginLeft: 40 }}
        icon={<PlusCircleOutlined />}
        onClick={changeModelVisibility}
      >
        Create New Quiz
      </Button>
      {modalVisibility && (
        <Modal
          visible={modalVisibility}
          title="Create New Quiz"
          footer={null}
          width={650}
          onCancel={changeModelVisibility}
        >
          <Spin spinning={formLoading} tip="Submitting...">
            <Form layout="vertical" form={form} onFinish={addQuizHandle}>
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input valid title!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <TextArea
                  placeholder="A small detail about this quiz"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  icon={<RightOutlined />}
                  htmlType="submit"
                  type="primary"
                >
                  Save & Next
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Modal>
      )}
    </>
  );
}
