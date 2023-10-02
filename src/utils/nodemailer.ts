import nodemailer, { Transporter } from "nodemailer";

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const sendMail = async (
  subject: string,
  fromEmail: string,
  htmlText: string,
) => {
  const transporter: Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  const mailOptions: MailOptions = {
    from: fromEmail,
    to: process.env.NODEMAILER_EMAIL!,
    subject: subject,
    html: htmlText,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendMail;
