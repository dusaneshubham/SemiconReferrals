const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const admin = require('../models/admin');
const candidate = require('../models/candidate');
const recruiter = require('../models/recruiter');

const verifyToken = expressAsyncHandler(async (req, res, next) => {
    const { token } = req.body;

    if (token) {
        const result = await jwt.verify(token, process.env.SECRETKEY);
        if (result) {
            let user;
            if (result.type === "candidate") {
                user = await candidate.findOne({ _id: result._id });
                if (user) {
                    req.user = user;
                    // res.json({ message: "User data", data: result, success: true });
                    next();
                } else {
                    res.json({ message: "Your token is invalid or expired!", success: false });
                }
            } else if (result.type === "admin") {
                user = await admin.findOne({ _id: result._id });
                if (user) {
                    req.user = user;
                    // res.json({ message: "User data", data: result, success: true });
                    next();
                } else {
                    res.json({ message: "Your token is invalid or expired!", success: false });
                }
            } else if (result.type === "recruiter") {
                user = await recruiter.findOne({ _id: result._id });
                if (user) {
                    req.user = user;
                    // res.json({ message: "User data", data: result, success: true });
                    next();
                } else {
                    res.json({ message: "Your token is invalid or expired!", success: false });
                }
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