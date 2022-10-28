const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const Candidate = require('../models/candidate');

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

    // Hashing the password
    const salt = bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating an object of candidate data
    const newCandidate = new Candidate({
        name,
        email,
        username,
        contactNumber,
        password: hashedPassword
    });

    newCandidate.save(async(err, result) => {
        if (err) {
            console.log(err);
            return await res.status(400).json({ message: "Error in registering the candidate" });
            // throw new Error("Error in registering the candidate");
        } else {
            console.log(result);
            return await res.send(200).json({ message: "Candidate has been registered successfully", username });
        }
    });

});

module.exports = { registerCandidate };