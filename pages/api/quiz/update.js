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

const UpdateQuiz = async (req, res) => {
  try {
    const { status, errors } = validateFormData(req.body);

    if (!status)
      return res.status(400).json({ type: "errors", errors: errors });

    const quiz = await prisma.quiz.findFirst({
      where: {
        id: parseInt(req.body.quizId),
        status: 0,
      },
      include: {
        questions: true,
      },
    });

    if (!quiz)
      return res.status(404).send({
        type: "message",
        message: "Quiz doesn't exist.",
      });

    const updatedQuiz = await prisma.quiz.update({
      where: {
        id: parseInt(req.body.quizId),
      },
      data: {
        title: req.body.title,
        description: req.body.description,
      },
    });

    return res.status(201).json(updatedQuiz);
  } catch (error) {
    console.log(error);

    return res.status(502).send({
      type: "message",
      message:
        "Sorry something went wrong. Please try again or reload this page.",
    });
  }
};

export default withAuth(UpdateQuiz);
