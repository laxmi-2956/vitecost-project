const nodemailer = require("nodemailer");
require("dotenv").config();
async function Sendmail(useremail, htmltemplate,subject) {
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: useremail,
    subject: subject,

    html: htmltemplate,
  });

  return info;
}

module.exports = Sendmail;