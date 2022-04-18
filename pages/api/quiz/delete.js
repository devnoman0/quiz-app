import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import withAuth from "../../../api_helpers/withAUth";

const PublishQuiz = async (req, res) => {
  try {
    const quiz = await prisma.quiz.findFirst({
      where: {
        id: parseInt(req.body.quizId),
      },
      select: {
        id: true,
        questions: {
          select: {
            id: true,
          },
        },
      },
    });

    const questionIds = quiz.questions?.map((item) => item.id);

    if (!quiz)
      return res.status(404).send({
        type: "message",
        message: "Quiz doesn't exist.",
      });

    await prisma.quiz.delete({
      where: {
        id: quiz.id,
      },
    });

    const deleteQuestions = await prisma.question.findMany({
      where: {
        quizId: quiz.id,
      },
    });

    deleteQuestions.forEach(async (item) => {
      await prisma.question.delete({
        where: {
          id: item.id,
        },
      });
    });

    const deletAnswers = await prisma.answer.findMany({
      where: {
        questionId: { in: questionIds },
      },
    });

    deletAnswers.forEach(async (item) => {
      await prisma.answer.delete({
        where: {
          id: item.id,
        },
      });
    });

    return res.status(201).json({ message: "Quiz deleted successfully" });
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
