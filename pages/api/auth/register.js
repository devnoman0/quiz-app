const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
import Cookies from "cookies";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const validateFormData = (data) => {
  const errors = {};

  if (!data.firstName || data.firstName?.trim() === "")
    errors.firstName = "Sorry first name can not be empty";

  if (!data.lastName || data.lastName?.trim() === "")
    errors.lastName = "Sorry last name can not be empty";

  if (!data.email || data.email?.trim() === "")
    errors.email = "Sorry email can not be empty";

  if (!data.password || data.password?.trim() === "")
    errors.password = "Sorry password can not be emapty";

  if (!data.confirmPassword || data.confirmPassword?.trim() === "")
    errors.confirmPassword = "Sorry confirm password can not be emapty";

  if (data.confirmPassword?.trim() !== data.password?.trim())
    errors.password = "Paswords and confirm password doesn't match.";

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

export default async function Register(req, res) {
  const { status, errors } = validateFormData(req.body);

  if (!status) return res.status(400).json({ type: "errors", errors: errors });

  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });

  if (user !== null) {
    return res.status(400).json({
      type: "message",
      message: "This email is already used, please try another email address.",
    });
  }

  //hash the password
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const newUser = await prisma.user.create({
    data: {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPassword,
    },
  });

  const cookies = new Cookies(req, res);

  //TODO:: Change the secret with .env file

  const token = await jwt.sign({ sub: newUser.id }, "test123343434", {
    expiresIn: "7d",
  });

  cookies.set("quiztoken", token, {
    httpOnly: true, // true by default
  });

  return res.json({ token, user: { ...newUser, password: null } });
}
