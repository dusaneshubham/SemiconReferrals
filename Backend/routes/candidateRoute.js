const express = require('express');
const router = express.Router();
const { registerCandidate, loginCandidate, logoutCandidate, applyForJob, withdrawApplication, getApplicationStatus } = require('../controllers/candidateController');
const uploadProfileImage = require('../middleware/profileImageUpload');
const uploadResume = require('../middleware/resumeUpload');

router.post("/register", registerCandidate);
router.post("/login", loginCandidate);
router.get("/logout", logoutCandidate);
router.post("/applyforjob", uploadResume, applyForJob);
router.delete("/withdrawApplication", withdrawApplication);
router.post("/updateProfile", uploadProfileImage, updateProfile);
router.post("/getapplicationstatus", getApplicationStatus);

module.exports = router;