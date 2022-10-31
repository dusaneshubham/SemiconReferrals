const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const candidate = require('../models/candidate');
const Candidate = require('../models/candidate');
const jobApplication = require('../models/jobApplication');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SEC);
}

// Register Candidate
const registerCandidate = asyncHandler(async (req, res) => {
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

    newCandidate.save(async (err, data) => {
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
const loginCandidate = asyncHandler(async (req, res) => {
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
        res.json({ message: "Candidate loggedin", status: "success", username });
    } else {
        res.json({ message: "Incorrect username or password", status: "error" });
    }
});

// Logout Candidate
const logoutCandidate = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out", status: "success" });
});

const applyForJob = asyncHandler(async (req, res) => {
    const { candidateId, jobId } = req.body;
    let resume = req.files;

    const jobApplication = new jobApplication({
        candidateId: candidateId,
        jobId: jobId,
        resume: resume
    });

    await jobApplication.save()
        .then(() => {
            res.json({ message: "successfully apply for job", status: "success" });
        }).catch(() => {
            res.json({ message: "Something went wrong during apply for job", status: "error" });
        })

});

const withdrawApplication = asyncHandler(async (req, res) => {
    const { _id } = req.body;

    const result = await jobApplication.deleteOne({ id: _id });

    if (result) {
        res.json({ message: "successfully withdraw your application", status: "success" });
    } else {
        res.json({ message: "We can't withdraw application", status: "error" });
    }
});

const updateProfile = asyncHandler(async (req, res) => {
    const { _id, name, email, username, contactNumber, gender, DOB, skills, linkedIn, experience, education, currentWorkingExperience } = req.body;
    const profileImage = req.files;
    const updateDate = {
        name: name,
        email: email,
        username: username,
        contactNumber: contactNumber,
        gender: gender,
        DOB: DOB,
        profileImage: profileImage,
        skills: skills,
        linkedIn: linkedIn,
        experience: experience,
        education: education,
        currentWorkingExperience: currentWorkingExperience
    }
    const result = await candidate.findOneAndUpdate({ id: _id }, updateDate, { new: true });
    if (result) {
        res.json({ message: "successfully update profile", status: "success" });
    } else {
        res.json({ message: "Somthing went wrong during update the profile", status: "error" });
    }
});

const getApplicationStatus = asyncHandler(async (req, res) => {
    const { _id } = req.body;
    const result = await jobApplication.findOne({ id: _id });

    if (result) {
        res.json({ message: "Get application status", application: result, status: "success" });
    } else {
        res.json({ message: "Application does not found!", status: "error" });
    }
});

module.exports = {
    registerCandidate,
    loginCandidate,
    logoutCandidate,
    applyForJob,
    withdrawApplication,
    updateProfile,
    getApplicationStatus
};