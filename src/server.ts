import app from "./app";
import config from "config";
import logger from "./utils/logger";
import connectDB from "./utils/connectDB";

const port = config.get<number>("port");

app.listen(port, () => {
  connectDB();
  logger.info(`listning on port http://localhost:${port}`);
});
