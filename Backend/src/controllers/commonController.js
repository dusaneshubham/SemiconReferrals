const expressAsyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

const getTokenData = expressAsyncHandler(async (req, res) => {
    const user = req.user;

    if (user) {
        res.json({ message: "Token Data", success: true, data: user, tokenData: req.tokenData });
    } else {
        res.json({ message: "Your token is invalid or expired!", success: false });
    }
});

const sendMailForContact = expressAsyncHandler(async (req, res) => {
    const { name, to, email, subject, message } = req.body;

    if (!name || !to || !email || !subject || !message) {
        res.json({ message: "All fields are required!!", success: false });
    } else {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: to,
            subject: "Regarding " + subject,
            html: `<p>Name: ${name}</p><p>Email: ${email}</p><br/>${message}`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                res.json({ message: "Something went wrong during sending mail!", success: false });
            } else {
                res.json({ message: "Thanks for contacting us. we will contact you through mail!!", success: true });
            }
        });
    }
});

module.exports = {
    getTokenData,
    sendMailForContact
}