import React, { useEffect, useContext } from "react";
import axios from "axios";

import { Layout } from "antd";

import UserContext from "../../context/user";
import HeaderComponent from "../Navigation/Header";
import FooterComponent from "../navigation/Footer";

const { Content } = Layout;

export default function PublicLayoutComponent({ children }) {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user === null) {
      axios
        .get("/api/auth/me")
        .then((res) => {
          setUser(res.data);
        })
        .catch(async (err) => {});
    }
  }, []);

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
