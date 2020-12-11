import dbConnection from "../../../util/dbConnection";
import User from "../../../models/user";
import jwt from "jsonwebtoken";
import Order from "../../../models/order";

dbConnection();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const token = req.cookies.jwt;
        if (!token) return res.end("noToken");
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
          if (err) return res.end("invalid");
          const user = await User.findById(decoded.id).exec();
          if (user.roles.includes("ordersManager")) {
            const orders = await Order.find({});
            return res.end(JSON.stringify(orders));
          }
          return res.end("done");
        });
      } catch (err) {
        return res.end("invalid");
      }
      break;
    case "POST":
      try {
        const token = req.cookies.jwt;
        const { body } = req;
        if (!token) return res.end("noToken");
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
          if (err) return res.end("invalid");
          const user = await User.findById(decoded.id).exec();
          if (user) {
            const order = new Order({
              userID: user._id,
              userName: user.name,
              number: user.number,
              products: body.proceedProducts,
              total: body.total,
              paymentMethod: body.payment,
              address: { content: user.addresses[body.selectedAddress] }
            });
            await order.save().catch((err) => console.log(err));
            return res.end("done");
          }
          return res.end("invalid");
        });
      } catch (err) {
        return res.end("invalid");
      }

      break;

    default:
      return res.end("invalid");
  }
};
