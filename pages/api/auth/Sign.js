import dbConnection from "../../../util/dbConnection";
import User from "../../../models/user";
import axios from "axios";
import qs from "qs";

dbConnection();

const generateOTP = () => {
  var digits = "0123456789";
  var OTP = new Array(5)
    .fill()
    .map(() => digits[Math.floor(Math.random() * 10)])
    .reduce((a, b) => {
      return a + b;
    });
  return OTP;
};

export default async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const { body } = req;
    try {
      if (
        body.phoneNumber.length === 7 ||
        body.phoneNumber.length === 8 ||
        body.phoneNumber.length === 10
      ) {
        const param1 = generateOTP();
        const d = Date.now();
        const user = await User.findOne({
          number: body.phoneNumber
        }).exec();

        if (user) {
          const min = 3 - (d - user.date) / 60000;

          if (min < 3 && min > 0) {
            var mins = Math.ceil(min);
            return res.end(`لإعادة المحاولة، نرجو منك الإنتظار ${mins} دقيقة.`);
          } else {
            User.findByIdAndUpdate(
              user._id,
              {
                otp: param1,
                date: new Date(),
                otptimes: user.otptimes + 1
              },
              (err) => console.log(err)
            );
          }
        } else {
          const createdUser = new User({
            number: body.phoneNumber,

            otp: param1,

            otptimes: 1
          });

          createdUser.save().catch((err) => console.log(err));
        }

        var options = {
          method: "POST",
          url: "https://api.ghasedak.io/v2/verification/send/simple",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            apikey: process.env.GHASEDAK_API
          },
          data: qs.stringify({
            type: "1",
            param1: param1,
            receptor:
              body.phoneNumber.length === 10
                ? "0" + body.phoneNumber
                : "+961" + body.phoneNumber,
            template: "test",
            lineNumber: process.env.LINENUMBER
          })
        };
        axios
          .request(options)
          .then((response) => {
            console.log(response.data.result.code);
          })
          .catch((err) => {
            console.log(err);
          });
        return res.end("done");
      } else {
        res.end("يرجى ادخال الرقم بالشكل الصحيح");
      }
    } catch (err) {
      return res.end("هناك خطأ في النظام يرجى المحاولة مجدداً");
    }
  }
  return res.end("هناك خطأ في النظام يرجى المحاولة مجدداً");
};
