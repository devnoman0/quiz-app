const jwt = require("jsonwebtoken");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const withAuth = (handle) => {
  return async (req, res) => {
    const authToken = req.cookies.quiztoken;

    if (authToken) {
      //Match Token With Our Secret Key
      try {
        const verified = await jwt.verify(authToken, process.env.SECRET_TOKEN);
        //check if user alreadt existed or not

        const checkUser = await prisma.user.findFirst({
          where: {
            id: verified.sub,
          },
        });

        if (!checkUser)
          return res
            .status(400)
            .json({ message: "Invalid auth token founded for invalid user" });

        req.user = checkUser;

        return handle(req, res);
      } catch (err) {
        console.log("err", err);

        return res.status(400).json({
          message: "Invalid auth token founded",
        });
      }
    } else {
      return res.status(403).json({ message: "No valid auth token founded" });
    }
  };
};

export default withAuth;
