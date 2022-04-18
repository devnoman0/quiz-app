import Cookies from "cookies";
import withAuth from "../../../api_helpers/withAUth";

const Logout = async (req, res) => {
  req.user = null;
  const cookies = new Cookies(req, res);

  cookies.set("quiztoken", null, {
    httpOnly: true, // true by default
    maxAge: Date.now(),
  });

  return res.status(200).json({ ...req.user, password: null });
};

export default withAuth(Logout);
