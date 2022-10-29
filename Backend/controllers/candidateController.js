const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Candidate = require('../models/candidate');


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SEC);
}


// Register Candidate
const registerCandidate = asyncHandler(async(req, res) => {
    const { name, email, password, contactNumber, username } = req.body;

    // Validations
    if (!email || !name || !password || !contactNumber || !username) {
        res.status(400).json({ message: "Please fill all the details" });
        throw new Error("Please fill all the details");
    }

    if (password.length < 8) {
        res.status(400).json({ message: "Password length must be greater than 8" });
        throw new Error("Password length must be greater than 8");
    }

    // Check if user exists or not
    const userExists = await Candidate.findOne({ username });
    if (userExists) {
        res.status(400).json({ message: "This username has already been taken" });
        throw new Error("This username has already been taken");
    }

    // Creating an object of candidate data
    const newCandidate = new Candidate({
        name,
        email,
        username,
        contactNumber,
        password
    });

    newCandidate.save(async(err, data) => {
        if (err) {
            console.log(err);
            return await res.status(400).json({ message: "Error in registering the candidate" });
            // throw new Error("Error in registering the candidate");
        }
        if (data) {
            console.log(data);
            // generating token for signin after registered
            let token = generateToken(data._id);

            res.cookie("token", token, {
                path: '/',
                httpOnly: true,
                // sameSite: "none",
                // secure: true
            }); // last 2 will be only used at deployment as in local we don't have https

            return await res.status(200).json({ message: "Candidate has been registered successfully", username, token });
        }
    });
});


const loginCandidate = asyncHandler(async(req, res) => {

})

module.exports = { registerCandidate, loginCandidate };