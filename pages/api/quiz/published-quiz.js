import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import withAuth from "../../../api_helpers/withAUth";

const PublishedQuiz = async (req, res) => {
  try {
    const quizs = await prisma.quiz.findMany({
      where: {
        userId: req.user.id,
        status: 1,
      },
    });

    return res.status(201).json(quizs);
  } catch (error) {
    console.log(error);

    return res.status(502).send({
      type: "message",
      message:
        "Sorry something went wrong. Please try again or reload this page.",
    });
  }
};

export default withAuth(PublishedQuiz);
