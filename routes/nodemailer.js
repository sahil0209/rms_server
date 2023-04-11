const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  // secure: true,
  auth: {
    user: "admiresecret71@gmail.com",
    pass: "pijgmkjbemfhcxrj",
  },
  // service: "google",
  // // host:"smtp.office365.com",
  // // port:587,
  // // secureConnection: false,
  // auth: {
  //   user: "admiresecret71@gmail.com",
  //   pass: "mobile123456",
  // },
});

function send_mail(to, subject, body, attachments, callback) {
  // send email
  let send_to = {
    from: "admiresecret71@gmail.com",
    to: to,
    subject: subject,
    attachments: attachments,
    html: body,
  };
  // console.log(send_to);
  transporter.sendMail(send_to, function (error, info) {
    // console.log(info);
    if (error) {
      console.log(error);
      return;
    }
    console.log("Sent: ");
  });
}

router.post("/adminMail", (req, res) => {
  let subject = req.body.subject;
  let bod = req.body.bod;
  let to = "hardikgarg01@gmail.com";
  let attachments = [];
  send_mail(to, subject, bod, attachments, (err, data) => {
    console.log(data);
  });
});

module.exports = router;
