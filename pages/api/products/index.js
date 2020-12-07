import dbConnection from "../../../util/dbConnection";
import Product from "../../../models/product";
import User from "../../../models/user";
import jwt from "jsonwebtoken";

dbConnection();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { body } = req;
        const token = req.cookies.jwt;
        if (!token) return res.end("noToken");
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
          if (err) return res.end("invalid");
          const user = await User.findById(decoded.id).exec();
          if (user.roles.includes("productsManager")) {
            const createdProduct = new Product({
              name: body.name,
              brand: body.brand,
              category: body.category,
              subCategory: body.subCategory,
              initprice: body.initprice,
              price: body.price,
              measure: body.measure,
              img: body.img,
              description: body.description
            });
            await createdProduct.save().catch((err) => console.log(err));
            return res.end("done");
          }
          return res.end("invalid");
        });
      } catch (err) {
        return res.end(JSON.stringify([]));
      }
      break;
    case "PUT":
      try {
        const { body } = req;
        const token = req.cookies.jwt;
        if (!token) return res.end("noToken");
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
          if (err) return res.end("invalid");
          const user = await User.findById(decoded.id).exec();
          if (user.roles.includes("productsManager")) {
            //////////////////////update///////////
            if (body.exist) {
              Product.findByIdAndUpdate(
                body.id,
                { exist: body.exist },
                (err) => {
                  return err && res.end("invalid");
                }
              );
            } else if (body.appear) {
              Product.findByIdAndUpdate(
                body.id,
                { appear: body.appear },
                (err) => {
                  return err && res.end("invalid");
                }
              );
            } else {
              Product.findByIdAndUpdate(
                body.id,
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
              );
            }
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
