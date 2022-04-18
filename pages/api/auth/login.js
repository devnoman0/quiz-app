const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
import Cookies from "cookies";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const validateFormData = (data) => {
  const errors = {};

  if (!data.email || data.email?.trim() === "")
    errors.email = "Sorry email can not be empty";

  if (!data.password || data.password?.trim() === "")
    errors.password = "Sorry password can not be emapty";

  if (Object.keys(errors).length !== 0) {
    return {
      status: false,
      errors,
    };
  } else {
    return {
      status: true,
      errors,
    };
  }
};

const Login = async (req, res) => {
  const { status, errors } = validateFormData(req.body);

  if (!status) return res.status(400).json({ type: "errors", errors: errors });

  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });

  if (user === null) {
    return res.status(400).json({
      type: "message",
      message: "Sorry email or password is not correct",
    });
  }
  const passwordMatched = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!passwordMatched)
    return res.status(400).json({
      type: "message",
      message: "Sorry email or password is not correct",
    });

  const token = await jwt.sign({ sub: user.id }, process.env.SECRET_TOKEN, {
    expiresIn: "7d",
  });

  const cookies = new Cookies(req, res);

  cookies.set("quiztoken", token, {
    httpOnly: true, // true by default
  });

  res.status(200).json({
    user,
    token,
  });
};

export default Login;
