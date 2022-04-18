import { Button, Form, Input, Spin, Typography } from "antd";
import Link from "next/link";
import { LoginOutlined } from "@ant-design/icons";

const { Text } = Typography;

const LoginFormComponent = ({ form, submitLoginForm, formLoading }) => {
  return (
    <Spin spinning={formLoading}>
      <Form
        form={form}
        style={{ marginTop: "30px", width: "100%" }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={submitLoginForm}
        layout="vertical"
      >
        <Form.Item
          style={{ width: "100%" }}
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
              type: "email",
            },
          ]}
          label="Email"
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button
            style={{ width: "170px" }}
            type="primary"
            htmlType="submit"
            icon={<LoginOutlined />}
          >
            Login
          </Button>
        </Form.Item>

        <div style={{ width: "100%", marginTop: "40px" }}>
          <Text style={{ fontSize: "15px" }}>
            {"Don't"} have an account?{" "}
            <Link href="/register">
              <a>Register</a>
            </Link>
          </Text>
        </div>
      </Form>
    </Spin>
  );
};

export default LoginFormComponent;
