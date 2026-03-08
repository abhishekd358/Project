import transporter from "../config/nodemailer.js";

const sendMail = async (to, subject, html) => {

  await transporter.sendMail({
    from: `"AptDox" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  });

};

export default sendMail;