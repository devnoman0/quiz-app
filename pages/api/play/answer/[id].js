import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const validateFormData = (data) => {
  const errors = {};

  if (!data.answer) errors.answer = "Sorry answer can not be empty";

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

const AnswerQuestion = async (req, res) => {
  try {
    const { status, errors } = validateFormData(req.body);

    if (!status)
      return res.status(400).json({ type: "errors", errors: errors });

    const { id } = req.query;

    const question = await prisma.question.findFirst({
      where: {
        id: parseInt(id),
        quizId: req.body.quizId,
      },
    });

    if (!question)
      return res.status(404).send({
        type: "message",
        message: "Question doesn't exist.",
      });

    if (question.type === 1) {
      //fetch the answer
      const answer = await prisma.answer.findFirst({
        where: {
          questionId: question.id,
          id: req.body.answer,
          isAnswer: true,
        },
      });

      if (!answer) return res.status(201).json({ answer: false });

      return res.status(201).json({ answer: true });
    }

    if (question.type === 0) {
      //correct answers

      const currectAnswers = await prisma.answer.count({
        where: {
          questionId: question.id,
          isAnswer: true,
        },
      });

      //fetch the answer
      const answerCount = await prisma.answer.count({
        where: {
          questionId: question.id,
          id: { in: req.body.answer },
          isAnswer: true,
        },
      });

      if (currectAnswers !== answerCount)
        return res.status(201).json({ answer: false });
      return res.status(201).json({ answer: true });
    }
  } catch (error) {
    console.log(error);

    return res.status(502).send({
      type: "message",
      message:
        "Sorry something went wrong. Please try again or reload this page.",
    });
  }
};

export default AnswerQuestion;
