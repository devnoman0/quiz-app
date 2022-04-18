import React, { useContext, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";

import { Card, Form, Layout, Typography } from "antd";

import AlertComponent from "../src/components/shared/AlertComponent";
import UserContext from "../src/context/user";
import SignupFormComponent from "../src/components/Signup/SignupFormComponent";
import PublicLayoutComponent from "../src/components/Layout/PublicLayoutComponent";

const { Content } = Layout;
const { Title } = Typography;

export default function Register() {
  const router = useRouter();

  const [form] = Form.useForm();
  const [formLoading, setFormLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  const submitSignupForm = (values) => {
    setFormLoading(true);
    axios
      .post(`/api/auth/register`, values)
      .then((res) => {
        setUser(res.data);
        router.replace("/on-board");
        setFormLoading(false);
      })
      .catch((err) => {
        console.log("err", err);

        AlertComponent(err.response?.data);
        setFormLoading(false);
      });
  };

  return (
    <PublicLayoutComponent>
      <Head>
        <title>Register</title>
      </Head>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
        }}
      >
        <Card style={{ width: 400 }} bodyStyle={{ padding: "40px" }}>
          <Title
            level={2}
            style={{ textAlign: "center", marginBottom: "40px" }}
          >
            Register
          </Title>
          <SignupFormComponent
            form={form}
            submitSignupForm={submitSignupForm}
            formLoading={formLoading}
          />
        </Card>
      </Content>
    </PublicLayoutComponent>
  );
}
