const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Candidate = require('../models/candidate');
const CandidateInfo = require('../models/candidateInfo');
const JobApplication = require('../models/jobApplication');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const fs = require('fs');
const path = require('path');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

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

// update profile
const updateProfile = asyncHandler(async (req, res) => {
    // candidate information details
    const {
        name,
        contactNumber,
        gender,
        DOB,
        qualification,
        experience,
        about,
        desiredCitiesToWork,
        isOpenToWork,
        noticePeriod,
        currentJobLocation,
        linkedIn
    } = req.body;

    // candidate main details
    let user = req.user;

    // const profileImage = req.files;

    const candidateUpdatedData = {
        name: name,
        contactNumber: contactNumber,
    };

    const candidateInfoUpdatedData = {
        gender: gender,
        DOB: DOB,
        // profileImage: profileImage,
        experience: experience,
        qualification: qualification,
        about: about,
        desiredCitiesToWork: desiredCitiesToWork,
        isOpenToWork: isOpenToWork,
        noticePeriod: noticePeriod,
        currentJobLocation: currentJobLocation,
        linkedIn: linkedIn
    }

    const result = await Candidate.findOneAndUpdate({ _id: user._id }, candidateUpdatedData, { new: true });

    if (result) {
        const response = await CandidateInfo.findOne({ candidateId: user._id });
        if (response) {
            // for old user
            const result1 = await CandidateInfo.updateOne({ candidateId: user._id }, candidateInfoUpdatedData, { new: true });
            if (result1) {
                res.json({ message: "Successfully update profile", success: true });
            } else {
                res.json({ message: "Somthing went wrong during update the profile", success: false });
            }
        } else {
            // for new user 
            const newInfo = new CandidateInfo({ candidateId: user._id, ...candidateInfoUpdatedData });
            await newInfo.save()
                .then((data, err) => {
                    if (data) {
                        res.json({ message: "Successfully update profile!!", success: true });
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

// change password
const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = req.user;

    if (!oldPassword || oldPassword === "" || !newPassword || newPassword === "") {
        res.json({ message: "Both field are required!!", success: false });
    } else {
        let result = await Candidate.findOne({ _id: user._id });
        if (result) {
            const compare = await bcrypt.compare(oldPassword, user.password);
            if (compare) {
                const hashPassword = await bcrypt.hash(newPassword, 10);
                result = await Candidate.updateOne({ _id: user._id }, { password: hashPassword }, { new: true });
                if (result) {
                    res.json({ message: "Successfully update your password!", success: true });
                } else {
                    res.json({ message: "Something went wrong during password update!", success: false });
                }
            } else {
                res.json({ message: "Your password is wrong!", success: false });
            }
        } else {
            res.json({ message: "Candidate not found!!", success: false });
        }
    }
});

// get candidate details
const getCandidateDetails = asyncHandler(async (req, res) => {
    let user = req.user;
    let candidateData = await Candidate.findOne({ _id: user._id });

    if (candidateData) {
        let candidateInfo = await CandidateInfo.findOne({ candidateId: user._id });
        if (candidateInfo) {
            res.json({
                email: candidateData.email,
                name: candidateData.name,
                contactNumber: candidateData.contactNumber,
                DOB: candidateInfo.DOB,
                gender: candidateInfo.gender,
                experience: candidateInfo.experience,
                qualification: candidateInfo.qualification,
                about: candidateInfo.about,
                desiredCitiesToWork: candidateInfo.desiredCitiesToWork,
                isOpenToWork: candidateInfo.isOpenToWork,
                noticePeriod: candidateInfo.noticePeriod,
                currentJobLocation: candidateInfo.currentJobLocation,
                workingExperience: candidateInfo.workingExperience,
                education: candidateInfo.education,
                resumes: candidateInfo.resumes,
                linkedIn: candidateInfo.linkedIn,
                followings: candidateInfo.followings,
                success: true
            });
        } else {
            // for new user
            res.json({
                email: candidateData.email,
                name: candidateData.name,
                contactNumber: candidateData.contactNumber,
                DOB: candidateInfo.DOB,
                success: true
            });
        }
    } else {
        res.json({ success: false, message: "Cannot get data" });
    }
});

// get candidate details by id
const getCandidateDetailsById = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (id) {
        const result = await Candidate.findOne({ candidateId: id }).select({ email: 1, contactNumber: 1, name: 1 });
        const info = await CandidateInfo.findOne({ candidateId: id });
        if (info && result) {
            const data = {
                name: result.name,
                email: result.email,
                contactNumber: result.contactNumber,
                skills: info.skills,
                savedJobPost: info.savedJobPost,
                followings: info.followings,
                resumes: info.resumes,
                education: info.education,
                workingExperience: info.workingExperience,
                DOB: info.DOB,
                gender: info.gender,
                experience: info.experience,
                qualification: info.qualification,
                about: info.about,
                currentJobLocation: info.currentJobLocation,
                desiredCitiesToWork: info.desiredCitiesToWork,
                isOpenToWork: info.isOpenToWork,
                noticePeriod: info.noticePeriod,
                linkedIn: info.linkedIn,
                defaultResumeId: info.defaultResumeId,
            };
            res.json({ message: "Candidate information", data: data, success: true });
        } else {
            res.json({ message: "User not found!", success: false });
        }
    } else {
        res.json({ message: "Invalid request", success: false });
    }
});

// update working experience
const updateWorkingExperience = asyncHandler(async (req, res) => {
    const { currentWorkingExperience } = req.body;
    const user = req.user;

    await CandidateInfo.findOneAndUpdate({ candidateID: user._id }, { workingExperience: currentWorkingExperience }, { new: true })
        .then((data, err) => {
            if (data) {
                // console.log("data", data);
                res.json({ message: "Successfully update profile!!", success: true });
            } else {
                console.log("err", err);
                res.json({ message: "Job experience has not been uploaded due to server error!", success: false });
            }
        }).catch((err) => {
            console.log(err);
            res.json({ message: "Experience has not been uploaded due to server error!", success: false });
        });
});

// update education details
const updateEducationDetails = asyncHandler(async (req, res) => {
    const { educationDetails } = req.body;
    const user = req.user;

    if (educationDetails) {
        await CandidateInfo.findOneAndUpdate({ candidateID: user._id }, { education: educationDetails }, { new: true })
            .then((data, err) => {
                if (data) {
                    // console.log("data", data);
                    res.json({ message: "Successfully update profile!!", success: true });
                } else {
                    console.log("err", err);
                    res.json({ message: "Educational details has not been uploaded due to server error!", success: false });
                }
            }).catch((err) => {
                console.log(err);
                res.json({ message: "Experience has not been uploaded due to server error!", success: false });
            });
    } else {
        res.json({ message: "Invalid request!!", success: false });
    }
});

// apply for job
const applyForJob = asyncHandler(async (req, res) => {
    const user = req.user;
    let data = req.body.data;

    const jobApplication = new JobApplication({
        candidateId: user._id,
        jobPostId: data.jobPostId,
        resume: {
            filename: data.resume,
            url: "http://localhost:5000/resumes/" + data.resume
        },
        coverLetter: data.coverLetter
    });

    jobApplication.save()
        .then(() => {
            res.json({ message: "Application for job has been submitted", success: true });
        }).catch(() => {
            res.json({ message: "Something went wrong during application for job", success: false });
        })
});

// check whether candidate has applied to the particular job or not
const isAppliedToJob = asyncHandler(async (req, res) => {
    const candidate = req.user;
    const { postId } = req.body;
    const isApplied = await JobApplication.findOne({ candidateId: candidate._id, jobPostId: postId }).count();
    if (isApplied) {
        res.json({ message: "Candidate has applied for the job", success: true });
    } else {
        res.json({ message: "Candidate have not applied for the job", success: false });
    }
})

const saveTheJobPost = asyncHandler(async (req, res) => {
    const candidate = req.user;
    const { postId } = req.body;

    const candidateInfo = await CandidateInfo.findOne({ candidateId: candidate._id });
    let updated = (candidateInfo.savedJobPost).push(postId);
    console.log(candidateInfo);

    // if (isApplied) {
    //     res.json({ message: "Candidate has applied for the job", success: true });
    // } else {
    //     res.json({ message: "Candidate have not applied for the job", success: false });
    // }
});

// withdraw application
const withdrawApplication = asyncHandler(async (req, res) => {
    const { _id } = req.body;

    const result = await JobApplication.deleteOne({ _id });

    if (result) {
        res.json({ message: "successfully withdraw your application", success: true });
    } else {
        res.json({ message: "We can't withdraw application", success: false });
    }
});

// get application status
const getApplicationStatus = asyncHandler(async (req, res) => {
    const { _id } = req.body;
    const result = await JobApplication.findOne({ _id });

    if (result) {
        res.json({ message: "Get application status", data: result, success: true });
    } else {
        res.json({ message: "Application does not found!", success: false });
    }
});

// get all application jobApplication
const getAllApplication = asyncHandler(async (req, res) => {
    const user = req.user;
    const result = await JobApplication.find({ candidateId: user._id });
    if (result) {
        res.json({ message: "All job application", data: result, success: true });
    } else {
        res.json({ message: "Error occure during find job application", success: false });
    }
});

// upload resume
const uploadMyResume = asyncHandler(async (req, res) => {
    let user = req.user;
    let myResumes = await CandidateInfo.findOne({ candidateId: user._id }).select({ "resumes": 1 });

    if (!myResumes) {
        resume = [];
        resume.push({ fileName: req.file.filename, url: 'http://localhost:5000/resumes/' + req.file.filename });
        let data = new CandidateInfo({
            candidateId: user._id,
            resumes: resume
        });
        await data.save().then(async (data) => {
            if (data) {
                console.log(data);
                await CandidateInfo.findOneAndUpdate({ candidateId: user._id }, { defaultResumeId: data.resume[0]._id }, { new: true })
                    .then((data) => {
                        if (data) {
                            console.log(data);
                            res.json({ message: "Resume has been uploaded!", defaultResumeId: data.defaultResumeId, success: true })
                        } else {
                            res.json({ message: "Something went wrong with server!!", success: false });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        res.json({ message: "Something went wrong with server!!", success: false });
                    });
            } else {
                res.json({ message: "Resume has not been uploaded due to server error!", success: false })
            }
        }).catch(() => {
            res.json({ message: "Resume has not been uploaded due to server error!", success: false })
        });
    } else {
        myResumes.resumes.push({ fileName: req.file.filename, url: 'http://localhost:5000/resumes/' + req.file.filename });
        await CandidateInfo.findOneAndUpdate({ candidateId: user._id }, { resumes: myResumes.resumes }, { new: true })
            .then(async (data) => {
                if (data) {
                    if (myResumes.resumes.length === 1) {
                        await CandidateInfo.updateOne({ candidateId: user._id }, { defaultResumeId: data.resumes[0]._id }, { new: true })
                            .then(() => {
                                res.json({ message: "Resume has been uploaded!", resumes: data.resumes, defaultResumeId: data.resumes[0]._id, success: true })
                            })
                            .catch((err) => {
                                console.log(err);
                                res.json({ message: "Error!! During making default resume!", success: false })
                            })
                    } else {
                        res.json({ message: "Resume has been uploaded!", success: true, resumes: data.resumes })
                    }
                } else {
                    res.json({ message: "Resume has not been uploaded due to server error!", success: false })
                }
            }).catch((err) => {
                console.log(err);
                res.json({ message: "Resume has not been uploaded due to server error!", success: false })
            });
    }
});

// make default resume
const makeDefaultResume = asyncHandler(async (req, res) => {
    const user = req.user;
    const { id } = req.body;

    if (id) {
        await CandidateInfo.findOneAndUpdate({ candidateId: user._id }, { defaultResumeId: id }, { new: true })
            .then((data) => {
                if (data) {
                    res.json({ message: "Default id", defaultResumeId: data.defaultResumeId, success: true });
                } else {
                    res.json({ message: "Something went wrong with server!!", success: false });
                }
            })
            .catch((err) => {
                console.log(err);
                res.json({ message: "Something went wrong with server!!", success: false });
            });
    } else {
        res.json({ message: "Invalid request", success: false });
    }
});

// delete resume
const deleteResume = asyncHandler(async (req, res) => {
    const { id, fileName } = req.body;
    const user = req.user;
    if (id) {
        await CandidateInfo.findOne({ candidateId: user._id })
            .then((data) => {
                fs.unlink(path.join(__dirname, `../resumes/${fileName}`), (err) => {
                    if (err) {
                        console.log(err);
                        res.json({ message: "Somthing went wrong during delete resume!!", success: false });
                    } else {
                        data.resumes.pull({ _id: id });
                        if (data.defaultResumeId == id)
                            data.defaultResumeId = null;
                        data.save().then((data) => {
                            res.json({ message: "Successfully delete resume!!", success: true, resumes: data.resumes });
                        }).catch((err) => {
                            console.log(err);
                            res.json({ message: "Somthing went wrong during delete resume!!", success: false });
                        });
                    }
                });
            }).catch((err) => {
                console.log(err);
                res.json({ message: "Somthing went wrong during delete resume!!", success: false });
            });
    } else {
        res.json({ message: "Invalid request!", success: false });
    }
});

// get all resume
const getAllMyResumes = asyncHandler(async (req, res) => {
    const user = req.user;
    let data = await CandidateInfo.findOne({ candidateId: user._id });
    if (data) {
        res.json({ message: "Resumes", resumes: data.resumes, defaultResumeId: data.defaultResumeId, success: true });
    } else {
        res.json({ message: "User not found!", success: false });
    }
});

//follow recruiter
const followRecruiter = asyncHandler(async (req, res) => {
    const { candidateId, recruiterId } = req.body;

    if (candidateId && recruiterId) {
        const result = await CandidateInfo.findOne({ candidateId: candidateId });
        if (result) {
            result.followings.push(recruiterId);
            CandidateInfo.findOneAndUpdate({ candidateId: candidateId }, { followings: result.followings }, { new: true })
                .then(() => {
                    res.json({ message: "Now you are followings this recruiter!!", success: true });
                }).catch((err) => {
                    console.log(err);
                    res.json({ message: "Somthing went wrong during follow recruiter", success: false });
                });
        } else {
            let followings = [recruiterId];
            const newCandidate = new CandidateInfo({
                candidateId: candidateId,
                followings: followings
            });

            newCandidate.save()
                .then(() => {
                    res.json({ message: "Now you are following this recruiter!!", success: true });
                })
                .catch((err) => {
                    console.log(err);
                    res.json({ message: "Somthing went wrong during follow recruiter!!", success: false });
                })
        }
    } else {
        res.json({ message: "Invalid request", success: false });
    }
});

// unfollow recruiter
const unFollowRecruiter = asyncHandler(async (req, res) => {
    const { candidateId, recruiterId } = req.body;

    if (candidateId && recruiterId) {
        const result = await CandidateInfo.findOne({ candidateId: candidateId });
        if (result) {
            result.followings.pull(recruiterId);
            result.save()
                .then(() => {
                    res.json({ message: "Now you are unfollwing this recruiter", success: true });
                }).catch((err) => {
                    res.json({ message: "Somthing went wrong during unfollowing!!", success: false });
                });
        } else {
            res.json({ message: "User not found!!", success: false });
        }
    } else {
        res.json({ message: "Invalid request!!", succes: false });
    }
});

module.exports = {
    registerCandidate,
    loginCandidate,
    updatePassword,
    updateProfile,
    changePassword,
    getCandidateDetails,
    getCandidateDetailsById,
    updateWorkingExperience,
    updateEducationDetails,
    applyForJob,
    withdrawApplication,
    getApplicationStatus,
    getAllApplication,
    uploadMyResume,
    makeDefaultResume,
    deleteResume,
    getAllMyResumes,
    isAppliedToJob,
    saveTheJobPost,
    followRecruiter,
    unFollowRecruiter
};