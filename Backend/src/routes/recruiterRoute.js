const express = require('express');
const router = express.Router();
const { registerRecruiter, loginRecruiter, updatePassword, getRecruiterDetails, removeSavedCandidate, getRecruiterDetailsById, updateProfile, jobPost, saveCandidateProfile, getSavedCandidate } = require('../controllers/recruiterController');
const verifyToken = require('../middleware/verifyToken');

// registration
router.post("/register/", registerRecruiter);
router.post("/login/", loginRecruiter);
router.post("/update-password", updatePassword);
router.post("/getRecruiterDetails", verifyToken, getRecruiterDetails);
router.post("/getRecruiterDetailsById", getRecruiterDetailsById);
router.post("/updateProfile", verifyToken, updateProfile);
router.post("/jobPost", verifyToken, jobPost);
router.post("/saveCandidateProfile", verifyToken, saveCandidateProfile);
router.post("/getSavedCandidate", verifyToken, getSavedCandidate);
router.post("/removeSavedCandidate", verifyToken, removeSavedCandidate);

module.exports = router;