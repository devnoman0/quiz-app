import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Layout, Spin } from "antd";
import HeaderComponent from "../navigation/Header";
import FooterComponent from "../navigation/Footer";
import UserContext from "../../context/user";

const { Content } = Layout;

export default function PrivateLayoutComponent({ children }) {
  const Router = useRouter();

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user === null) {
      axios
        .get("/api/auth/me")
        .then((res) => {
          setUser(res.data);
        })
        .catch(async (err) => {
          Router.replace("/login");
        });
    }
  }, []);

  if (user === null) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin tip="Hold tight—just getting this page ready"></Spin>
      </div>
    );
  }

  return (
    <Layout>
      <HeaderComponent />
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64, background: "#fff" }}
      >
        <div style={{ padding: 24, minHeight: 600 }}>{children}</div>
      </Content>
      <FooterComponent />
    </Layout>
  );
}
