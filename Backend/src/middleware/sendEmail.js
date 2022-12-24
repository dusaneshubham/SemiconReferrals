const expressAsyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const { isEmail } = require('validator');
const hbs = require('nodemailer-express-handlebars');
const jwt = require('jsonwebtoken');
// const { encrypt } = require("./encrypt-decrypt");
const path = require('path');
const candidate = require("../models/candidate");
const recruiter = require("../models/recruiter");

const sendEmail = expressAsyncHandler(async (req, res) => {
    const { name, email } = req.body.data;
    const { type } = req.body;

    if (!name && !email) {
        res.json({ message: "All field are required", success: false });
    } else if (!isEmail(email)) {
        res.json({ message: "Invalid email", success: false });
    } else {
        let _candidate, _recruiter;
        if (type === "candidate") {
            _candidate = await candidate.findOne({ email: email });
        } else {
            _recruiter = await recruiter.findOne({ email: email });
        }

        if (!_candidate && !_recruiter) {
            const token = await jwt.sign(req.body, process.env.SECRETKEY, { expiresIn: 60 * 60 * 2 });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });

            // point to the template folder
            const handlebarOptions = {
                viewEngine: {
                    partialsDir: path.resolve('./src/views/'),
                    defaultLayout: false,
                },
                viewPath: path.resolve('./src/views/'),
            };

            // use a template file with nodemailer
            transporter.use('compile', hbs(handlebarOptions));

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Welcome " + name,
                text: "Hii",
                template: 'Email',
                context: {
                    username: name,
                    url: `http://localhost:3000/email-verification?token=${token}`,
                    year: new Date().getFullYear()
                },
                attachments: [{
                    filename: 'Company logo.png',
                    path: path.join(__dirname, '../views/company_logo.png'),
                    cid: 'logo'
                }]
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                    res.json({ message: "Something went wrong during sending mail!", success: false });
                } else {
                    res.json({ message: "Verification mail has been sent on your mail Id!", success: true });
                }
            });
        } else {
            res.json({ message: "User is already exist!", success: false });
        }
    }

});

module.exports = sendEmail;