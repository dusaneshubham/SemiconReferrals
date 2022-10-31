const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Candidate = require('../models/candidate');


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SEC);
}


// Register Candidate
const registerCandidate = asyncHandler(async(req, res) => {
    const { name, email, password, contactNumber, username } = req.body;

    // Validations
    if (!email || !name || !password || !contactNumber || !username) {
        res.json({ message: "Please fill all the details", status: "error" });
    }

    if (password.length < 8) {
        res.json({ message: "Password length must be greater than 8", status: "error" });
    }

    // Check if user exists or not
    const userExists = await Candidate.findOne({ username });
    if (userExists) {
        res.json({ message: "This username has already been taken", status: "error" });
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
            return await res.json({ message: "Error in registering the candidate", status: "error" });
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

            return await res.json({ message: "Candidate has been registered successfully", status: "success", username, token });
        }
    });
});


// Login Candidate
const loginCandidate = asyncHandler(async(req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.json({ message: "Please fill all the fields", status: "error" });
    }

    const user = await Candidate.findOne({ username });

    if (!user) {
        res.json({ message: "Incorrect username or password", status: "error" });
    }

    // const isPasswordCorrect = await bcrypt.compare(password, user.password);
    const isPasswordCorrect = await Candidate.authenticate(password);

    if (user && isPasswordCorrect) {
        res.json({ message: "Candidate loggedin", status: "ok", username });
    } else {
        res.json({ message: "Incorrect username or password", status: "error" });
    }
});


// Logout Candidate
const logoutCandidate = asyncHandler(async(req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out", status: "ok" });
});


module.exports = { registerCandidate, loginCandidate, logoutCandidate };