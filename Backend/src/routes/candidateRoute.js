const express = require('express');
const router = express.Router();
const { registerCandidate, loginCandidate, logoutCandidate, applyForJob, withdrawApplication, getApplicationStatus, updateProfile, updatePassword } = require('../controllers/candidateController');
const uploadProfileImage = require('../middleware/profileImageUpload');
const uploadResume = require('../middleware/resumeUpload');

router.post("/register", registerCandidate);
router.post("/login", loginCandidate);
router.post("/update-password", updatePassword);
router.get("/logout", logoutCandidate);
router.post("/applyforjob", uploadResume.array('resume'), applyForJob);
router.delete("/withdrawApplication", withdrawApplication);
router.post("/updateProfile", uploadProfileImage.array('profileImage'), updateProfile);
router.post("/getapplicationstatus", getApplicationStatus);

module.exports = router;