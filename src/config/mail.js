import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendEmail(receivers, subject, html) {
  await transporter.sendMail({
    from: process.env.SENDER_EMIAL,
    to: receivers,
    subject: subject,
    html,
  });
}

export { transporter, sendEmail };
