import withAuth from "../../../api_helpers/withAUth";

const me = async (req, res) => {
  return res.status(200).json({ ...req.user, password: null });
};

export default withAuth(me);
