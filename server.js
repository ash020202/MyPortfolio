const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/sendmail", async (req, res) => {
  const { name, email, message } = req.body;
  // console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GPASS,
    },
  });
  const mailOptions = {
    from: email,
    to: "vimalofficial02@gmail.com",
    subject: `Message from ${name}`,
    text: message,
  };
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      // console.log("Error sending email", error);

      return res.status(500).json({ message: "Error sending email" });
    } else {
      // console.log("Email sent");

      return res.status(200).json({ message: "Email sent" });
    }
  });
});
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running`);
});
