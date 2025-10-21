import mongoose from "mongoose";

export const connectDB = async () => {

  try {
    // const conn = await mongoose.connect(process.env.MONGO_URI);
    //  console.log("Connected to MongoDB", conn.connection.host);
    const { MONGO_URI } = process.env;
    if (!MONGO_URI) { throw new Error("MONGO_URI is not set") }
  }
  catch (error) {
    console.log(error);
    process.exit(1); // 1 status code means fail, 0 = sucess
  };
};