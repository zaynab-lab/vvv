import dbConnection from "../../../../util/dbConnection";
import Product from "../../../../models/product";
import User from "../../../../models/user";
import jwt from "jsonwebtoken";

dbConnection();

export default async (req, res) => {
  const { method } = req;
  const { body } = req;
  const {
    query: { id }
  } = req;
  console.log(id);
  switch (method) {
    case "PUT":
      try {
        const token = req.cookies.jwt;
        if (!token) return res.end("noToken");
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
          if (err) return res.end("invalid");
          const user = await User.findById(decoded.id).exec();
          if (user.roles.includes("productsManager")) {
            //////////////////////update///////////
            if (!!body.exist === body.exist) {
              Product.findByIdAndUpdate(id, { exist: body.exist }, (err) => {
                return err && res.end("invalid");
              }).exec();
            } else if (!!body.appear === body.appear) {
              Product.findByIdAndUpdate(id, { appear: body.appear }, (err) => {
                return err && res.end("invalid");
              }).exec();
            } else {
              Product.findByIdAndUpdate(
                id,
                {
                  img: body.img,
                  name: body.name,
                  brand: body.brand,
                  initprice: body.initprice,
                  price: body.price,
                  description: body.description,
                  measure: body.measure,
                  category: body.category,
                  subCategory: body.subCategory
                },
                (err) => {
                  return err && res.end("invalid");
                }
              ).exec();
            }
            return res.end("done");
          }
          return res.end("invalid");
        });
      } catch (err) {
        return res.end("invalid");
      }
      break;
    case "DELETE":
      try {
        Product.findByIdAndRemove(id, (err) => {
          return err && res.end("invalid");
        });
      } catch (err) {
        return res.end("invalid");
      }
      break;

    default:
      return res.end("invalid");
  }
};
