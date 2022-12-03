const express = require('express');
const router = express.Router();
const { registerRecruiter, loginRecruiter, updatePassword, getRecruiterDetails, getRecruiterDetailsById, updateProfile, jobPost, saveProfile } = require('../controllers/recruiterController');
const verifyToken = require('../middleware/verifyToken');

// registration
router.post("/register/", registerRecruiter);
router.post("/login/", loginRecruiter);
router.post("/update-password", updatePassword);
router.post("/getRecruiterDetails", verifyToken, getRecruiterDetails);
router.post("/getRecruiterDetailsById", getRecruiterDetailsById);
router.post("/updateProfile", verifyToken, updateProfile);
router.post("/jobPost", verifyToken, jobPost);
router.post("/saveProfile", verifyToken, saveProfile);

module.exports = router;