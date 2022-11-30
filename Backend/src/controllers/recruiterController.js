const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Recruiter = require('../models/recruiter');
const RecruiterInfo = require('../models/recruiterInfo');
const JobPost = require('../models/jobPost');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

// Generate the token
const generateToken = (user) => {
    return jwt.sign({ _id: user._id, type: "recruiter" }, process.env.SECRETKEY);
}

// register api
const registerRecruiter = asyncHandler(async(req, res) => {
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

    newRecruiter.save(async(err, data) => {
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
const loginRecruiter = asyncHandler(async(req, res) => {
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
const updatePassword = asyncHandler(async(req, res) => {
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

const getRecruiterDetails = asyncHandler(async(req, res) => {
    let user = req.user;
    let recruiterData = await Recruiter.findOne({ _id: user._id });

    if (recruiterData) {
        let recruiterInfo = await RecruiterInfo.findOne({ recruiterId: user._id });
        if (recruiterInfo) {
            res.json({
                name: recruiterData.name,
                companyName: recruiterInfo.companyName,
                email: recruiterData.email,
                contactNumber: recruiterData.contactNumber,
                companyWebsite: recruiterInfo.companyWebsite,
                linkedin: recruiterInfo.linkedin,
                totalExperience: recruiterInfo.totalExperience,
                teamName: recruiterInfo.teamName,
                teamSize: recruiterInfo.teamSize,
                location: recruiterInfo.location,
                designation: recruiterInfo.designation,
                currentExperience: recruiterInfo.experienceInCurrentOrganization,
                teamWorkDescription: recruiterInfo.teamWorkDescription,
                success: true
            });
        } else {
            // for new user
            res.json({
                email: recruiterData.email,
                name: recruiterData.name,
                contactNumber: recruiterData.contactNumber,
                success: true
            });
        }
    } else {
        res.json({ success: false, message: "Cannot get data" });
    }
})

const updateProfile = asyncHandler(async(req, res) => {
    // recruiter information details
    const {
        name,
        companyName,
        email,
        contactNumber,
        companyWebsite,
        linkedin,
        totalExperience,
        teamName,
        teamSize,
        location,
        designation,
        currentExperience,
        teamWorkDescription
    } = req.body;

    // recruiter main details
    let user = req.user;

    // const profileImage = req.files;

    const recruiterUpdatedData = {
        name: name,
        contactNumber: contactNumber,
    };

    const recruiterInfoUpdatedData = {
        companyName: companyName,
        companyWebsite: companyWebsite,
        linkedin: linkedin,
        totalExperience: totalExperience,
        teamName: teamName,
        teamSize: teamSize,
        location: location,
        designation: designation,
        experienceInCurrentOrganization: currentExperience,
        teamWorkDescription: teamWorkDescription,
    }

    console.log(recruiterUpdatedData, recruiterInfoUpdatedData);

    const result = await Recruiter.findOneAndUpdate({ _id: user._id }, recruiterUpdatedData, { new: true });

    if (result) {
        const response = await RecruiterInfo.findOne({ recruiterId: user._id });
        if (response) {
            // for old user
            const result1 = await RecruiterInfo.updateOne({ recruiterId: user._id }, recruiterInfoUpdatedData, { new: true });
            if (result1) {
                res.json({ message: "Successfully update profile", success: true, data: {...recruiterInfoUpdatedData, ...recruiterUpdatedData } });
            } else {
                res.json({ message: "Somthing went wrong during update the profile", success: false });
            }
        } else {
            // for new user 
            const newInfo = new RecruiterInfo({ recruiterId: user._id, ...recruiterInfoUpdatedData });
            await newInfo.save()
                .then((data, err) => {
                    if (data) {
                        res.json({ message: "Successfully update profile", success: true, data: {...recruiterInfoUpdatedData, ...recruiterUpdatedData } });
                    } else {
                        console.log(err);
                        res.json({ message: "Somthing went wrong during update the profile", success: false });
                    }
                }).catch((err) => {
                    res.json({ message: "Somthing went wrong during update the profile", success: false });
                });
        }
    } else {
        res.json({ message: "Somthing went wrong during update the profile", success: false });
    }
});

const jobPost = asyncHandler(async(req, res) => {
    let user = req.user;
    const jobDetails = new JobPost({
        recruiterId: user._id,
        jobTitle: req.body.jobTitle,
        jobCategory: req.body.jobCategory,
        jobDescription: req.body.jobDescription,
        keyResponsibilities: req.body.keyResponsibilities,
        applicationDeadline: req.body.applicationDeadline,
        qualification: req.body.qualification,
        experience: req.body.experience,
        jobType: req.body.jobType,
        jobLevel: req.body.jobLevel,
        numberOfVacancies: req.body.numberOfVacancies,
        location: req.body.location,
    })

    jobDetails.save((err, data) => {
        if (err) {
            console.log(err);
            return res.json({ message: "Error in creating a job post", success: false });
        } else {
            return res.json({ message: "Successfully created the job post", success: true });
        }
    })
});

module.exports = {
    registerRecruiter,
    loginRecruiter,
    updatePassword,
    getRecruiterDetails,
    updateProfile,
    jobPost
}