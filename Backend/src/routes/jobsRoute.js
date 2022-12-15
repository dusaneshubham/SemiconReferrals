const express = require('express');
const router = express.Router();
const { getJobDetails, getPendingJobs, getPendingApplications, getAllJobDetails, getActiveJobs, getInactiveJobs } = require('../controllers/jobController.js');
const verifyToken = require("../middleware/verifyToken");

router.post("/getJobDetails", getJobDetails);
router.get("/getAllJobDetails", getAllJobDetails);
router.get("/getPendingJobs", getPendingJobs);
router.get("/getPendingApplications", getPendingApplications);
router.post("/getActiveJobs", verifyToken, getActiveJobs);
router.post("/getInactiveJobs", verifyToken, getInactiveJobs);

module.exports = router;