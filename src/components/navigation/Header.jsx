import React, { useContext } from "react";
import Link from "next/link";

import { Layout, Menu, Row, Col, Button } from "antd";

import Logo from "../shared/Logo";

import { useActiveLink } from "../../hooks/activelink";
import UserContext from "../../context/user";
import AddNewQuiz from "../Quiz/AddNew";
import axios from "axios";
import { useRouter } from "next/router";
import { route } from "next/dist/server/router";
import AlertComponent from "../shared/AlertComponent";

const { Header } = Layout;

export default function HeaderComponent() {
  const router = useRouter();

  const [activeLink] = useActiveLink();
  const { user } = useContext(UserContext);

  const signOutHandle = () => {
    axios
      .post("/api/auth/logout")
      .then((res) => {
        router.reload(window.location.pathname);
      })
      .catch((err) => {
        AlertComponent({
          type: "message",
          message: "Sorry something went wrong",
        });
      });
  };

  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        background: "#fff",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <Row>
        <Col span={4}>
          <Logo />
        </Col>

        {user === null && (
          <Col span={20}>
            <Menu
              theme="light"
              mode="horizontal"
              style={{ display: "flex", justifyContent: "flex-end" }}
              activeKey={activeLink}
            >
              <Menu.Item key="1">
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link href="/register">
                  <a>Signup</a>
                </Link>
              </Menu.Item>
            </Menu>
          </Col>
        )}

        {user !== null && (
          <Col span={20}>
            <Row style={{ display: "flex", justifyContent: "flex-end" }}>
              <Col>
                <Menu
                  theme="light"
                  mode="horizontal"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                  activeKey={activeLink}
                >
                  <Menu.Item key="3">
                    <Link href="/on-board">
                      <a>Published Quiz</a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <Link href="/drafted-quiz">
                      <a>Drafted Quiz</a>
                    </Link>
                  </Menu.Item>
                </Menu>
              </Col>
              <Col>
                <AddNewQuiz />
              </Col>
              <Col>
                <Button
                  style={{ marginLeft: 10 }}
                  type="dashed"
                  onClick={signOutHandle}
                >
                  Signout
                </Button>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </Header>
  );
}
