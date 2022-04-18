import { notification } from "antd";

const AlertComponent = (data) => {
  console.log("called");

  if (data.type === "message") {
    notification["error"]({
      message: "Error",
      description: data.message,
    });
  } else if (data.type === "errors") {
    console.log(Object.keys(data.errors));

    Object.keys(data.errors).map((item) => {
      notification["error"]({
        message: "Error",
        description: data.errors[item],
      });
    });
  }
};

export default AlertComponent;
