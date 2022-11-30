const express = require('express');
const router = express.Router();
const { registerCandidate, loginCandidate, logoutCandidate, applyForJob, withdrawApplication, getApplicationStatus, updateProfile, updatePassword, uploadMyResume, deleteResume, getAllMyResumes, getCandidateDetails, updateWorkingExperience, updateEducationDetails, changePassword, getAllApplication } = require('../controllers/candidateController');
const uploadProfileImage = require('../middleware/profileImageUpload');
const uploadResume = require('../middleware/resumeUpload');
const verifyToken = require('../middleware/verifyToken');

router.post("/register", registerCandidate);
router.post("/login", loginCandidate);
router.post("/update-password", updatePassword);
router.get("/logout", logoutCandidate);
router.post("/applyforjob", uploadResume.array('resume'), applyForJob);
// router.post("/uploadMyResume", uploadResume.single('resume'), uploadMyResume);
router.post("/uploadMyResume", uploadResume.single('resume'), verifyToken, uploadMyResume);
router.post("/deleteResume", verifyToken, deleteResume);
router.post("/getAllMyResumes", verifyToken, getAllMyResumes);
router.delete("/withdrawApplication", withdrawApplication);
// router.post("/updateProfile", uploadProfileImage.array('profileImage'), verifyToken, updateProfile);
router.post("/updateProfile", verifyToken, updateProfile);
router.post("/updateWorkingExperience", verifyToken, updateWorkingExperience);
router.post("/updateEducationDetails", verifyToken, updateEducationDetails);
router.post("/changePassword", verifyToken, changePassword);
router.post("/getCandidateDetails", verifyToken, getCandidateDetails);
router.post("/getapplicationstatus", getApplicationStatus);
router.post("/getallapplication", verifyToken, getAllApplication);

module.exports = router;