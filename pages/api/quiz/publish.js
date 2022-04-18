import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import withAuth from "../../../api_helpers/withAUth";

const PublishQuiz = async (req, res) => {
  try {
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

    if (quiz.questions.length !== 10)
      return res.status(404).send({
        type: "message",
        message: "Quiz doesn't have 10 questions",
      });

    const updatedQuiz = await prisma.quiz.update({
      where: {
        id: parseInt(req.body.quizId),
      },
      data: {
        status: 1,
        slug: Array(6)
          .fill(0)
          .map((x) => Math.random().toString(36).charAt(2))
          .join(""),
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

export default withAuth(PublishQuiz);
