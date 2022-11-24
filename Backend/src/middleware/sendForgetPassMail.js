const expressAsyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');
const { isEmail } = require('validator');
const admin = require('../models/admin');
const candidate = require('../models/candidate');
const recruiter = require('../models/recruiter');
const jwt = require('jsonwebtoken');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');

const sendForgetPassMail = expressAsyncHandler(async (req, res) => {
    const { type, email } = req.body;

    if (!type && !email) {
        res.json({ message: "All field are required!", success: false });
    } else if (!isEmail(email)) {
        res.json({ message: "Error! Invalid email id!", success: false });
    } else {
        let user;
        if (type === "candidate") {
            user = await candidate.findOne({ email: email });
        } else if (type === "admin") {
            user = await admin.findOne({ email: email });
        } else if (type === "recruiter") {
            user = await recruiter.findOne({ email: email });
        }

        if (user) {
            const token = await jwt.sign({ email, type }, process.env.SECRETKEY);

            // const transporter = nodemailer.createTransport({
            //     service: 'gmail',
            //     auth: {
            //         user: process.env.EMAIL,
            //         pass: process.env.PASSWORD
            //     }
            // });

            // // point to the template folder
            // const handlebarOptions = {
            //     viewEngine: {
            //         partialsDir: path.resolve('./src/views/'),
            //         defaultLayout: false,
            //     },
            //     viewPath: path.resolve('./src/views/'),
            // };

            // // use a template file with nodemailer
            // transporter.use('compile', hbs(handlebarOptions));

            // const mailOptions = {
            //     from: process.env.EMAIL,
            //     to: email,
            //     subject: "reset password!",
            //     text: "Hii",
            //     template: 'ForgetPass',
            //     context: {
            //         url: `http://localhost:3000/forget-pass?token=${token}`,
            //         year: new Date().getFullYear()
            //     },
            //     attachments: [{
            //         filename: 'Company logo.png',
            //         path: path.join(__dirname, '../views/company_logo.png'),
            //         cid: 'logo'
            //     }]
            // };

            // transporter.sendMail(mailOptions, (err, info) => {
            //     if (err) {
            //         console.log(err);
            //         res.json({ message: "Something went wrong during sending mail!", success: false });
            //     } else {
            //         res.json({ message: "Reset password mail has been sent on your mail Id! " + url, success: true });
            //     }
            // });
            res.json({ message: "Reset password mail has been sent on your mail Id! ", url: `http://localhost:3000/forget-pass?token=${token}`, success: true });
        } else {
            res.json({ message: "User not found!", success: false });
        }
    }

});

module.exports = sendForgetPassMail;