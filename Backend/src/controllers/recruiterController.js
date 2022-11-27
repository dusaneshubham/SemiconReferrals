const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Recruiter = require('../models/recruiter');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

// Generate the token
const generateToken = (user) => {
    return jwt.sign({ _id: user._id, type: "recruiter" }, process.env.SECRETKEY);
}

// register api
const registerRecruiter = asyncHandler(async (req, res) => {
    const { name, email, contactNumber, password } = req.body;

    // Validations
    if (!email || !name || !password || !contactNumber) {
        return res.json({ message: "Please fill all the details", success: false });
    }

    if (password.length < 8) {
        return res.json({ message: "Password length must be greater than 8", success: false });
    }

    // Check if user exists or not
    const userExists = await Recruiter.findOne({ email });
    if (userExists) {
        return res.json({ message: "This email has already registered", success: false });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newRecruiter = new Recruiter({
        name,
        email,
        contactNumber,
        password: hashPassword
    });

    newRecruiter.save(async (err, data) => {
        if (err) {
            console.log(err);
            return res.json({ message: "Error in registering the recruiter", success: false });
        } else {
            // console.log(data);
            // generating token for signin after registered
            let token = generateToken(data);
            return res.json({ message: "Recruiter has been registered successfully", success: true, token: token });
        }
    })
});

// login recruiter
const loginRecruiter = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.json({ message: "Please fill all the fields", success: false });
    }

    const user = await Recruiter.findOne({ email });

    if (!user) {
        res.json({ message: "Incorrect email or password", success: false });
    } else {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        // const isPasswordCorrect = await Recruiter.authenticate(password);

        if (user && isPasswordCorrect) {
            let token = await generateToken(user);
            res.json({ message: "Recruiter loggedin", success: true, token: token });
        } else {
            res.json({ message: "Incorrect email or password", success: false });
        }
    }
});

// update password
const updatePassword = asyncHandler(async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
        res.json({ message: "All field are required!", success: false });
    } else if (!isEmail(email)) {
        res.json({ message: "Invalid mail Id!", success: false });
    } else if (password !== confirmPassword) {
        res.json({ message: "Password and Confirm password does not match!", success: false });
    } else {
        const newPassword = await bcrypt.hash(password, 10);
        const updatePassword = await Recruiter.findOneAndUpdate({ email: email }, { password: newPassword }, { new: true });
        if (updatePassword) {
            console.log(updatePassword);
            res.json({ message: "Your password has been saved!", success: true });
        } else {
            res.json({ message: "Something went wrong during update password!", success: false });
        }
    }
});

module.exports = {
    registerRecruiter,
    loginRecruiter,
    updatePassword
}