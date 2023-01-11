import nodemailer from "nodemailer";
import config from "config";
import logger from "./logger";

const transporter = nodemailer.createTransport(config.get("smtp"));

export const sendMail = async (options: nodemailer.SendMailOptions) => {
  const info = await transporter.sendMail(options);
  logger.info("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
