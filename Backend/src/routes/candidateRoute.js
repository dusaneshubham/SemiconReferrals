const express = require('express');
const router = express.Router();
const { registerCandidate, loginCandidate, applyForJob, withdrawApplication, getApplicationStatus, updateProfile, updatePassword, uploadMyResume, deleteResume, getAllMyResumes, getCandidateDetails, getCandidateDetailsId, updateWorkingExperience, updateEducationDetails, changePassword, getAllApplication, makeDefaultResume, isAppliedToJob, saveTheJobPost } = require('../controllers/candidateController');
const uploadProfileImage = require('../middleware/profileImageUpload');
const uploadResume = require('../middleware/resumeUpload');
const verifyToken = require('../middleware/verifyToken');

router.post("/register", registerCandidate);
router.post("/login", loginCandidate);
router.post("/update-password", updatePassword);
router.post("/applyforjob", verifyToken, applyForJob);
router.post("/isAppliedToJob", verifyToken, isAppliedToJob);
router.post("/saveTheJobPost", verifyToken, saveTheJobPost);
router.post("/uploadMyResume", uploadResume.single('resume'), verifyToken, uploadMyResume);
router.post("/makeDefaultResume", verifyToken, makeDefaultResume);
router.post("/deleteResume", verifyToken, deleteResume);
router.post("/getAllMyResumes", verifyToken, getAllMyResumes);
router.delete("/withdrawApplication", withdrawApplication);
// router.post("/updateProfile", uploadProfileImage.array('profileImage'), verifyToken, updateProfile);
router.post("/updateProfile", verifyToken, updateProfile);
router.post("/updateWorkingExperience", verifyToken, updateWorkingExperience);
router.post("/updateEducationDetails", verifyToken, updateEducationDetails);
router.post("/changePassword", verifyToken, changePassword);
router.post("/getCandidateDetails", verifyToken, getCandidateDetails);
router.post("/getCandidateDetailsById", getCandidateDetailsId);
router.post("/getapplicationstatus", getApplicationStatus);
router.post("/getAllApplication", verifyToken, getAllApplication);

module.exports = router;