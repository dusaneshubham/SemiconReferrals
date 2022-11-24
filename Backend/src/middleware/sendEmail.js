const expressAsyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const { isEmail } = require('validator');
const hbs = require('nodemailer-express-handlebars');
const jwt = require('jsonwebtoken');
// const { encrypt } = require("./encrypt-decrypt");
const path = require('path');

const sendEmail = expressAsyncHandler(async(req, res) => {
    const { name, email } = req.body.data;

    if (!name && !email) {
        res.json({ message: "All field are required", success: false });
    } else if (!isEmail(email)) {
        res.json({ message: "Invalid email", success: false });
    } else {

        const token = await jwt.sign(req.body, process.env.SECRETKEY, { expiresIn: '2h' });
        // const encryptToken = encrypt(token);

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
            template: 'Email-template',
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
    }

});

module.exports = sendEmail;