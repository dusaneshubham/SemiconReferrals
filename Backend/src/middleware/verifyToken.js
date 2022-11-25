const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const admin = require('../models/admin');
const candidate = require('../models/candidate');
const recruiter = require('../models/recruiter');

const verifyToken = expressAsyncHandler(async (req, res) => {
    const { token } = req.body;

    if (token) {
        const result = await jwt.verify(token, process.env.SECRETKEY);

        if (result) {
            let user;
            if (result.type === "candidate") {
                user = await candidate.findOne({ email: result.email });
            } else if (result.type === "admin") {
                user = await admin.findOne({ email: result.email });
            } else if (result.type === "recruiter") {
                user = await recruiter.findOne({ email: result.email });
            } else {
                res.json({ message: "Your token is invalid or expired!", success: false });
            }

            if (user) {
                res.json({ message: "User data", data: result, success: true });
            } else {
                res.json({ message: "Your token is invalid or expired!", success: false });
            }
        } else {
            res.json({ message: "Your token is invalid or expired!", success: false });
        }
    } else {
        res.json({ message: "Token is not found!", success: false })
    }
});

module.exports = verifyToken