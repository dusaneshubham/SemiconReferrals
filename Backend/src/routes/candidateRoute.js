const express = require('express');
const router = express.Router();
const {
    registerCandidate,
    loginCandidate,
    updateEmailId,
    applyForJob,
    withdrawApplication,
    getApplicationStatus,
    updateProfile,
    updateProfileImage,
    updatePassword,
    uploadMyResume,
    deleteResume,
    getAllMyResumes,
    getCandidateDetails,
    getCandidateDetailsById,
    updateWorkingExperience,
    updateEducationDetails,
    changePassword,
    getAllJobApplications,
    makeDefaultResume,
    isAppliedToJob,
    saveTheJobPost,
    getSaveTheJobPost,
    followRecruiter,
    getFollowings,
    unFollowRecruiter,
    isSavedJob,
    unDefaultResume,
    getMailForResetMail,
    getAllCandidateDetails
} = require('../controllers/candidateController');
const uploadProfileImage = require('../middleware/profileImageUpload');
const uploadResume = require('../middleware/resumeUpload');
const verifyToken = require('../middleware/verifyToken');

router.post("/register", registerCandidate);
router.post("/login", loginCandidate);
router.post("/updateEmailId", verifyToken, updateEmailId);
router.post("/update-password", updatePassword);
router.post("/applyforjob", verifyToken, applyForJob);
router.post("/isAppliedToJob", verifyToken, isAppliedToJob);
router.post("/isSavedJob", verifyToken, isSavedJob);
router.post("/saveTheJobPost", verifyToken, saveTheJobPost);
router.post("/getSaveTheJobPost", verifyToken, getSaveTheJobPost);
router.post("/uploadMyResume", uploadResume.single('resume'), verifyToken, uploadMyResume);
router.post("/makeDefaultResume", verifyToken, makeDefaultResume);
router.post("/makeUndefaultResume", verifyToken, unDefaultResume);
router.post("/deleteResume", verifyToken, deleteResume);
router.post("/getAllMyResumes", verifyToken, getAllMyResumes);
router.delete("/withdrawApplication", withdrawApplication);
router.post("/updateProfile", verifyToken, updateProfile);
router.post("/updateProfileImage", uploadProfileImage.single('profileImage'), verifyToken, updateProfileImage);
router.post("/updateWorkingExperience", verifyToken, updateWorkingExperience);
router.post("/updateEducationDetails", verifyToken, updateEducationDetails);
router.post("/changePassword", verifyToken, changePassword);
router.post("/getCandidateDetails", verifyToken, getCandidateDetails);
router.post("/getCandidateDetailsById", getCandidateDetailsById);
router.post("/getapplicationstatus", getApplicationStatus);
router.post("/getAllJobApplications", verifyToken, getAllJobApplications);
router.post("/getFollowings", verifyToken, getFollowings);
router.post("/followRecruiter", verifyToken, followRecruiter);
router.post("/unFollowRecruiter", verifyToken, unFollowRecruiter);
router.post("/getMailForResetMail", verifyToken, getMailForResetMail);
router.get("/getAllCandidateDetails", getAllCandidateDetails);

module.exports = router;