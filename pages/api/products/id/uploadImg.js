import dbConnection from "../../../../util/dbConnection";
import Product from "../../../../models/product";
import User from "../../../../models/user";
import jwt from "jsonwebtoken";
const { Storage } = require("@google-cloud/storage");
const fs = require("fs");
const formidable = require("formidable");

dbConnection();

const gc = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: "public/config.json"
});

export const config = { api: { bodyParser: false } };

const bucket = gc.bucket(process.env.BUCKET_NAME);

export default async (req, res) => {
  const { method } = req;
  const {
    query: { id, category }
  } = req;

  if (method === "POST") {
    !fs.existsSync("public/config.json") &&
      (await fs.writeFile("public/config.json", process.env.GCLOUD_KEY, () =>
        console.log("finished")
      ));
    try {
      const token = req.cookies.jwt;
      if (!token) return res.end("noToken");
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.end("invalid");
        const user = await User.findById(decoded.id).exec();
        if (user.roles.includes("productsManager")) {
          const form = new formidable.IncomingForm();
          form.keepExtensions = true;
          await form.parse(req, (err, fields, files) => {
            bucket.upload(
              files.file.path,
              {
                destination: `Products/${category}/${id}.png`,
                gzip: true,
                metadata: {
                  cacheControl: "public, max-age=31536000"
                }
              },
              (err, file) => {
                res.status(200).end(file.name);
                !err &&
                  Product.findByIdAndUpdate(id, { img: true }, (err) => {
                    return err && res.end("invalid");
                  }).exec();
              }
            );
          });
          return res.status(200).end("done");
        }
        return res.end("invalid");
      });
    } catch (err) {
      return res.end("invalid");
    }
  }
};
