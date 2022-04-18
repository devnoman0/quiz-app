import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import withAuth from "../../../../api_helpers/withAUth";

const QuizDetail = async (req, res) => {
  try {
    const { id } = req.query;

    const quiz = await prisma.quiz.findFirst({
      where: {
        id: parseInt(id),
        status: 0,
      },
      include: {
        questions: {
          include: { answers: true },
        },
      },
    });

    if (!quiz)
      return res.status(404).send({
        type: "message",
        message: "Quiz doesn't exist.",
      });

    return res.status(201).json(quiz);
  } catch (error) {
    console.log(error);

    return res.status(502).send({
      type: "message",
      message:
        "Sorry something went wrong. Please try again or reload this page.",
    });
  }
};

export default withAuth(QuizDetail);
