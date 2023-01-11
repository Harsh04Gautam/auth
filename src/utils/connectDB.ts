import mongoose from "mongoose";
import logger from "./logger";
import config from "config";

const connectDB = async () => {
  try {
    const dbURI = config.get<string>("dbURI");

    mongoose.set("strictQuery", true);
    await mongoose.connect(dbURI);
    logger.info("DB connected successfully 🟢");
  } catch (err) {
    logger.error("could not connect to DB 🔴");
    process.exit(1);
  }
};

export default connectDB;
