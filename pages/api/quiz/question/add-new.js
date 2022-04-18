import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import withAuth from "../../../../api_helpers/withAUth";

const validateFormData = (data) => {
  const errors = {};

  if (!data.text || data.text?.trim() === "")
    errors.text = "Sorry text can not be empty";

  if (!data.type || data.type?.trim() === "")
    errors.type = "Sorry answer type can not be empty";

  if (!data.options || data.type?.length === 0)
    errors.options = "Sorry answer options can't be empty";

  if (!data.quizId || data.quizId === "")
    errors.quizId = "Sorry quiz can't be empty";

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

const AddQuestion = async (req, res) => {
  try {
    const { status, errors } = validateFormData(req.body);

    if (!status)
      return res.status(400).json({ type: "errors", errors: errors });

    //check if this name is already existed
    const checkText = await prisma.question.findFirst({
      where: {
        text: req.body.text,
        quizId: req.body.quizId,
      },
    });

    if (checkText)
      return res.status(502).send({
        type: "message",
        message: "Question text must need to be unique",
      });

    //create new quiz
    const newQuestion = await prisma.question.create({
      data: {
        text: req.body.text,
        type: parseInt(req.body.type),
        quizId: req.body.quizId,
      },
    });

    const formattedAnswers = [];

    req.body.options?.forEach((element) => {
      formattedAnswers.push({
        questionId: newQuestion.id,
        option: element.option,
        isAnswer: element.answer,
      });
    });

    //create answers
    const answers = await prisma.answer.createMany({
      data: formattedAnswers,
    });

    return res.status(201).json({ ...newQuestion, answers: formattedAnswers });
  } catch (error) {
    console.log("error", error);

    return res.status(502).send({
      type: "message",
      message:
        "Sorry something went wrong. Please try again or reload this page.",
    });
  }
};

export default withAuth(AddQuestion);
