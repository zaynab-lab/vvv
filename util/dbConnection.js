import mongoose from "mongoose";

async function dbConnection() {
  if (mongoose.connections[0].readyState) return;

  await mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true
    },
    () => {
      console.log("connected");
    }
  );
}

export default dbConnection;
