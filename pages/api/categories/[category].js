import dbConnection from "../../../util/dbConnection";
import Category from "../../../models/category";
import User from "../../../models/user";
import jwt from "jsonwebtoken";

// import authenticate from "../middleware";

dbConnection();
export default async (req, res) => {
  const { method } = req;
  const {
    query: { category }
  } = req;

  switch (method) {
    case "GET":
      try {
        const selectedcategory = await Category.findOne({
          name: category
        }).exec();

        return res.end(JSON.stringify(selectedcategory.subCategory));
      } catch (err) {
        return res.end(JSON.stringify([]));
      }

    case "DELETE":
      try {
        const token = req.cookies.jwt;
        if (!token) return res.end("noToken");
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
          if (err) return res.end("invalid");
          const user = await User.findById(decoded.id).exec();
          if (user.roles.includes("GM")) {
            Category.deleteOne({ name: category }).exec();
            return res.end("done");
          }
          return res.end("invalid");
        });
      } catch (err) {
        return res.end(JSON.stringify([]));
      }
      break;
    default:
      return res.end(JSON.stringify([]));
  }
};
