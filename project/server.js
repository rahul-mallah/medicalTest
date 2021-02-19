require('dotenv').config();

const { google, outlook, office365, yahoo, ics } = require("calendar-link");

const express = require("express");
const router = express.Router();
const path = require('path');
const cors = require("cors");
const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000)
const nodemailer = require('nodemailer');

// setup server that run on port 5000
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(PORT, () => console.log("Server Running"));

app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

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
    const department = req.body.department;
    const startTime = timeslot.split(' - ');
    
    // convert 12hr clock to 24hour clock
    const convertTime12to24 = time12h => {
        const [time, modifier] = time12h.split(" ");
       
        let [hours, minutes] = time.split(":");
       
        if (hours === "12") {
          hours = "00";
        }
       
        if (modifier === "PM") {
          hours = parseInt(hours, 10) + 12;
        }
       
        return `${hours}:${minutes}`;
    };

    var convertTime = convertTime12to24(startTime[0]);
    
    // calendar invite
    const event = {
        title: "Medical Appointment with " + doctor,
        location: department,
        description: "Medical Appoint with " + doctor + " at " + department,
        start: date + " " + convertTime + " +0800",
        duration: [1, "hour"],
    };
    const mail = {
        from: 'UOWMyAppointment@gmail.com',
        to: email,
        cc: 'UOWMyAppointment@gmail.com',
        subject: 'MyAppointment Booking Confirmation',
        html: `<p> Dear ${user}, </p>
                <p> This email is to inform you that your booking with doctor ${doctor} on ${date} ${timeslot} is confirmed. </p>
                <br/>
                <p><b>Add Appointment to Calendar: </b></p>
                <a style="padding: 2px;" href=${google(event)}>Google</a>
                <a style="padding: 2px;" href=${outlook(event)}>Outlook</a>
                <a style="padding: 2px;" href=${office365(event)}>Office 365</a>
                <a style="padding: 2px;" href=${yahoo(event)}>Yahoo</a>
                <br/>
                <br/>
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

// create email for reschedule appointment
router.post("/reschedule", (req, res) => {
    const date = req.body.date;
    const doctor = req.body.doctor;
    const timeslot = req.body.timeslot;
    const user = req.body.user;
    const email = req.body.email;
    const department = req.body.department;
    const startTime = timeslot.split(' - ');
    
    // convert 12hr clock to 24hour clock
    const convertTime12to24 = time12h => {
        const [time, modifier] = time12h.split(" ");
       
        let [hours, minutes] = time.split(":");
       
        if (hours === "12") {
          hours = "00";
        }
       
        if (modifier === "PM") {
          hours = parseInt(hours, 10) + 12;
        }
       
        return `${hours}:${minutes}`;
    };

    var convertTime = convertTime12to24(startTime[0]);
    
    // calendar invite
    const event = {
        title: "Medical Appointment with " + doctor,
        location: department,
        description: "Medical Appoint with " + doctor + " at " + department,
        start: date + " " + convertTime + " +0800",
        duration: [1, "hour"],
    };

    const mail = {
        from: 'UOWMyAppointment@gmail.com',
        to: email,
        cc: 'UOWMyAppointment@gmail.com',
        subject: 'MyAppointment Reschedule Confirmation',
        html: `<p> Dear ${user}, </p>
                <p> This email is to inform you that your booking with ${doctor} has been successfully changed to ${date} ${timeslot}. </p>
                <br/>
                <p><b>Add Appointment to Calendar: </b></p>
                <a style="padding: 2px;" href=${google(event)}>Google</a>
                <a style="padding: 2px;" href=${outlook(event)}>Outlook</a>
                <a style="padding: 2px;" href=${office365(event)}>Office 365</a>
                <a style="padding: 2px;" href=${yahoo(event)}>Yahoo</a>
                <br/>
                <br/>
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

// create email for cancel appointment
router.post("/cancel", (req, res) => {
    const date = req.body.date;
    const doctor = req.body.doctor;
    const timeslot = req.body.timeslot;
    const user = req.body.user;
    const email = req.body.email;
    const mail = {
        from: 'UOWMyAppointment@gmail.com',
        to: email,
        cc: 'UOWMyAppointment@gmail.com',
        subject: 'MyAppointment Cancellation Confirmation',
        html: `<p> Dear ${user}, </p>
                <p> This email is to inform you that your booking with ${doctor} on ${date} ${timeslot} has been successfully cancelled. </p>
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

// create email for doctor reschedule appointment
router.post("/docReschedule", (req, res) => {
    const date = req.body.date;
    const doctor = req.body.doctor;
    const timeslot = req.body.timeslot;
    const user = req.body.user;
    const email = req.body.email;
    const department = req.body.department;
    const startTime = timeslot.split(' - ');
    
    // convert 12hr clock to 24hour clock
    const convertTime12to24 = time12h => {
        const [time, modifier] = time12h.split(" ");
       
        let [hours, minutes] = time.split(":");
       
        if (hours === "12") {
          hours = "00";
        }
       
        if (modifier === "PM") {
          hours = parseInt(hours, 10) + 12;
        }
       
        return `${hours}:${minutes}`;
    };

    var convertTime = convertTime12to24(startTime[0]);
    
    // calendar invite
    const event = {
        title: "Medical Appointment with " + doctor,
        location: department,
        description: "Medical Appoint with " + doctor + " at " + department,
        start: date + " " + convertTime + " +0800",
        duration: [1, "hour"],
    };

    const mail = {
        from: 'UOWMyAppointment@gmail.com',
        to: email,
        cc: 'UOWMyAppointment@gmail.com',
        subject: 'MyAppointment Reschedule',
        html: `<p> Dear ${user}, </p>
                <p> This email is to inform you that your booking with ${doctor} has been changed to ${date} ${timeslot}. </p>
                <p> You can check your appointment details or reschedule the appointment via myAppointment app.</p>
                <br/>
                <p><b>Add Appointment to Calendar: </b></p>
                <a style="padding: 2px;" href=${google(event)}>Google</a>
                <a style="padding: 2px;" href=${outlook(event)}>Outlook</a>
                <a style="padding: 2px;" href=${office365(event)}>Office 365</a>
                <a style="padding: 2px;" href=${yahoo(event)}>Yahoo</a>
                <br/>
                <br/>
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

// create email for reminder
router.post("/sendReminder", (req, res) => {
    const date = req.body.date;
    const doctor = req.body.doctor;
    const timeslot = req.body.timeslot;
    const user = req.body.user;
    const email = req.body.email;
    const department = req.body.department;
    const startTime = timeslot.split(' - ');
    
    // convert 12hr clock to 24hour clock
    const convertTime12to24 = time12h => {
        const [time, modifier] = time12h.split(" ");
       
        let [hours, minutes] = time.split(":");
       
        if (hours === "12") {
          hours = "00";
        }
       
        if (modifier === "PM") {
          hours = parseInt(hours, 10) + 12;
        }
       
        return `${hours}:${minutes}`;
    };

    var convertTime = convertTime12to24(startTime[0]);
    
    // calendar invite
    const event = {
        title: "Medical Appointment with " + doctor,
        location: department,
        description: "Medical Appoint with " + doctor + " at " + department,
        start: date + " " + convertTime + " +0800",
        duration: [1, "hour"],
    };
    const mail = {
        from: 'UOWMyAppointment@gmail.com',
        to: email,
        cc: 'UOWMyAppointment@gmail.com',
        subject: 'MyAppointment Appointment Reminder',
        html: `<p> Dear ${user}, </p>
                <p> Your appointment with ${doctor} is scheduled on ${date} ${timeslot}. </p>
                <p> You can check your appointment details or reschedule the appointment via myAppointment app.</p>
                <br/>
                <p><b>Add Appointment to Calendar: </b></p>
                <a style="padding: 2px;" href=${google(event)}>Google</a>
                <a style="padding: 2px;" href=${outlook(event)}>Outlook</a>
                <a style="padding: 2px;" href=${office365(event)}>Office 365</a>
                <a style="padding: 2px;" href=${yahoo(event)}>Yahoo</a>
                <br/>
                <br/>
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