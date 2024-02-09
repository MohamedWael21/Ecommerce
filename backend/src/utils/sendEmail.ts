import { EmailPayload } from "../types/email";
import nodemailer from "nodemailer";
export default async function sendEmail(payload: EmailPayload) {
  const transporter = nodemailer.createTransport({
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: payload.email,
    subject: payload.subject,
    text: payload.message,
  };
  await transporter.sendMail(mailOptions);
}
