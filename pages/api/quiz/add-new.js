import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import withAuth from "../../../api_helpers/withAUth";

const validateFormData = (data) => {
  const errors = {};

  if (!data.title || data.title?.trim() === "")
    errors.title = "Sorry title can not be empty";

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

const AddQuiz = async (req, res) => {
  try {
    const { status, errors } = validateFormData(req.body);

    if (!status)
      return res.status(400).json({ type: "errors", errors: errors });

    //check if this name is already existed

    const checkTitle = await prisma.quiz.findFirst({
      where: {
        title: req.body.title,
      },
    });

    if (checkTitle)
      return res.status(502).send({
        type: "message",
        message: "Quiz title must need to be unique",
      });

    //create new quiz
    const newQuiz = await prisma.quiz.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        userId: req.user.id,
        status: 0,
      },
    });

    return res.status(201).json(newQuiz);
  } catch (error) {
    return res.status(502).send({
      type: "message",
      message:
        "Sorry something went wrong. Please try again or reload this page.",
    });
  }
};

export default withAuth(AddQuiz);
