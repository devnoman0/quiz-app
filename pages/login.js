import React, { useState, useContext } from "react";
import Head from "next/head";

import { useRouter } from "next/router";
import axios from "axios";

import { Card, Form, Layout, Typography } from "antd";

import AlertComponent from "../src/components/shared/AlertComponent";
import UserContext from "../src/context/user";
import LoginFormComponent from "../src/components/Login/LoginFormComponent";
import PublicLayoutComponent from "../src/components/Layout/PublicLayoutComponent";

const { Content } = Layout;
const { Title } = Typography;

export default function Register() {
  const router = useRouter();

  const [form] = Form.useForm();
  const [formLoading, setFormLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  const submitLoginForm = (values) => {
    setFormLoading(true);
    axios
      .post(`/api/auth/login`, values)
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
        <title>Login</title>
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
            Login
          </Title>

          <LoginFormComponent
            form={form}
            submitLoginForm={submitLoginForm}
            formLoading={formLoading}
          />
        </Card>
      </Content>
    </PublicLayoutComponent>
  );
}
