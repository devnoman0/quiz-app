import { Button, Form, Input, Spin, Typography } from "antd";
import Link from "next/link";
import { LoginOutlined } from "@ant-design/icons";

const { Text } = Typography;

const SignupFormComponent = ({ form, submitSignupForm, formLoading }) => {
  return (
    <Spin spinning={formLoading}>
      <Form
        form={form}
        style={{ marginTop: "30px", width: "100%" }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={submitSignupForm}
        layout="vertical"
      >
        <Form.Item
          style={{ width: "100%" }}
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
          label="First Name"
        >
          <Input placeholder="First Name" />
        </Form.Item>

        <Form.Item
          style={{ width: "100%" }}
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your Last Name!",
            },
          ]}
          label="Last Name"
        >
          <Input placeholder="Last Name" />
        </Form.Item>
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

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
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
            SignUp
          </Button>
        </Form.Item>

        <div style={{ width: "100%", marginTop: "40px" }}>
          <Text style={{ fontSize: "15px" }}>
            Already have an account?{" "}
            <Link href="/login">
              <a>Login</a>
            </Link>
          </Text>
        </div>
      </Form>
    </Spin>
  );
};

export default SignupFormComponent;
