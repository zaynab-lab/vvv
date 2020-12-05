import dbConnection from "../../../util/dbConnection";
import Category from "../../../models/category";

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
    default:
      return res.end(JSON.stringify([]));
  }
};
