const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Candidate = require('../models/candidate');
const CandidateInfo = require('../models/candidateInfo');
const jobApplication = require('../models/jobApplication');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');

// Generate the token
const generateToken = (user) => {
    return jwt.sign({ _id: user._id, type: "candidate" }, process.env.SECRETKEY);
}

// Register Candidate
const registerCandidate = asyncHandler(async (req, res) => {
    const { name, email, password, contactNumber } = req.body;

    // Validations
    if (!email || !name || !password || !contactNumber) {
        return res.json({ message: "Please fill all the details", success: false });
    }

    if (password.length < 8) {
        return res.json({ message: "Password length must be greater than 8", success: false });
    }

    // Check if user exists or not
    const userExists = await Candidate.findOne({ email });
    if (userExists) {
        return res.json({ message: "This email has already registered", success: false });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // Creating an object of candidate data
    const newCandidate = new Candidate({
        name,
        email,
        contactNumber,
        password: hashPassword
    });

    newCandidate.save(async (err, data) => {
        if (err) {
            console.log(err);
            return res.json({ message: "Error in registering the candidate", success: false });
        }
        if (data) {
            // console.log(data);
            // generating token for signin after registered
            let token = generateToken(data);
            return res.json({ message: "Candidate has been registered successfully", success: true, token: token });
        }
    });
});

// Login Candidate
const loginCandidate = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.json({ message: "Please fill all the fields", success: false });
    }

    const user = await Candidate.findOne({ email });
    if (!user) {
        res.json({ message: "Incorrect email or password", success: false });
    } else {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        // const isPasswordCorrect = await Candidate.authenticate(password);

        if (user && isPasswordCorrect) {
            let token = await generateToken(user);
            res.json({ message: "Candidate loggedin", success: true, token: token });
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
        const updatePassword = await Candidate.findOneAndUpdate({ email: email }, { password: password }, { new: true });
        if (updatePassword) {
            res.json({ message: "Your password has been saved!", success: true });
        } else {
            res.json({ message: "Something went wrong during update password!", success: false });
        }
    }
});

// Logout Candidate
const logoutCandidate = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out", success: true });
});

const uploadMyResume = asyncHandler(async (req, res) => {
    let user = req.user;
    let myResumes = await CandidateInfo.findOne({ candidateId: user._id }).select({ "resumes": 1 });

    if (!myResumes) {
        resume = [];
        resume.push(req.file.path);
        let data = new CandidateInfo({
            candidateId: user._id,
            resumes: resume
        });
        await data.save().then(() => {
            res.json({ message: "Resume has been uploaded!", success: true })
        }).catch(() => {
            res.json({ message: "Resume has not been uploaded due to server error!", success: false })
        });
    } else {
        myResumses.reumes.push(req.file.path);
        await CandidateInfo.findOneAndUpdate({ candidateId: user._id }, { resumes: myResumes.resumes }, { new: true }).then((err, data) => {
            if (err) {
                console.log(err);
                res.json({ message: "Resume has not been uploaded due to server error!", success: false })
            } else {
                res.json({ message: "Resume has been uploaded!", success: true })
            }
        }).catch((err) => {
            console.log(err);
            res.json({ message: "Resume has not been uploaded due to server error!", success: false })
        });
    }
});

const getAllMyResumes = asyncHandler(async (req, res) => {
    let data = await CandidateInfo.find({ candidateId: "637f0fb8886fad29ca1fd0e7" });
    res.json({ images: data[0].resumes, success: true });
})

const applyForJob = asyncHandler(async (req, res) => {
    const { candidateId, jobId } = req.body;
    let resume = req.files;

    const jobApplication = new jobApplication({
        candidateId,
        jobId,
        resume
    });

    await jobApplication.save()
        .then(() => {
            res.json({ message: "successfully apply for job", success: true });
        }).catch(() => {
            res.json({ message: "Something went wrong during apply for job", success: false });
        })

});

const withdrawApplication = asyncHandler(async (req, res) => {
    const { _id } = req.body;

    const result = await jobApplication.deleteOne({ _id });

    if (result) {
        res.json({ message: "successfully withdraw your application", status: "success" });
    } else {
        res.json({ message: "We can't withdraw application", success: false });
    }
});

// TODO : education, currentWorkingExperience contains object
const updateProfile = asyncHandler(async (req, res) => {
    const { _id, name, email, username, contactNumber, gender, DOB, skills, linkedIn, experience, education, currentWorkingExperience } = req.body;
    const profileImage = req.files;
    const updatedData = {
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
    const result = await Candidate.findOneAndUpdate({ _id }, updatedData, { new: true });
    if (result) {
        res.json({ message: "successfully update profile", success: true, data: updatedData });
    } else {
        res.json({ message: "Somthing went wrong during update the profile", success: false });
    }
});

const getApplicationStatus = asyncHandler(async (req, res) => {
    const { _id } = req.body;
    const result = await jobApplication.findOne({ _id });

    if (result) {
        res.json({ message: "Get application status", data: result, success: true });
    } else {
        res.json({ message: "Application does not found!", success: false });
    }
});

module.exports = {
    registerCandidate,
    loginCandidate,
    updatePassword,
    logoutCandidate,
    applyForJob,
    withdrawApplication,
    updateProfile,
    getApplicationStatus,
    uploadMyResume,
    getAllMyResumes
};