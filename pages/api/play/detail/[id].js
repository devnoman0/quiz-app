import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const QuizDetail = async (req, res) => {
  try {
    const { id } = req.query;

    const quiz = await prisma.quiz.findFirst({
      where: {
        slug: id,
        status: 1,
      },
      select: {
        id: true,
        title: true,
        description: true,
        questions: {
          select: {
            id: true,
            text: true,
            type: true,
            quizId: true,
            answers: {
              select: {
                id: true,
                questionId: true,
                option: true,
              },
            },
          },
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

export default QuizDetail;
