require('dotenv').config();

const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require('nodemailer');

// setup server that run on port 5000
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));

// setup email
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    }
});
transporter.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to Send");
    }
  });

// create email for book appointment
router.post("/book", (req, res) => {
    const date = req.body.date;
    const doctor = req.body.doctor;
    const timeslot = req.body.timeslot;
    const user = req.body.user;
    const email = req.body.email;
    const mail = {
        from: 'UOWMyAppointment@gmail.com',
        to: email,
        cc: 'UOWMyAppointment@gmail.com',
        subject: 'MyAppointment Booking Confirmation',
        html: `<p> Dear ${user}, </p>
                <p> This email is to inform you that your booking with doctor ${doctor} on ${date} ${timeslot} is confirmed. </p>
                <p> Regards, </p>
                <p> MyAppointment Team </p>
        `
    };
    transporter.sendMail(mail, (error) => {
        if (error)
        {
            res.json({status: "ERROR"});
        }
        else
        {
            res.json({status: "Confirmation Email Sent"});
        }
    });
});

// create email for create account
router.post("/createAcc", (req, res) => {
    const user = req.body.user;
    const email = req.body.email;
    const mail = {
        from: 'UOWMyAppointment@gmail.com',
        to: email,
        cc: 'UOWMyAppointment@gmail.com',
        subject: 'MyAppointment Account Creation',
        html: `<p> Dear ${user}, </p>
                <p> This email is to inform you that your account has been successfully created. </p>
                <p> Regards, </p>
                <p> MyAppointment Team </p>
        `
    };
    transporter.sendMail(mail, (error) => {
        if (error)
        {
            res.json({status: "ERROR"});
        }
        else
        {
            res.json({status: "Email Sent"});
        }
    });
});