import dbConnection from "../../../util/dbConnection";
import User from "../../../models/user";

dbConnection();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        // const users = await User.find({});
        // return res.status(200).json({ success: true, data: users });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
  }
};
