const express = require('express');
const router = express.Router();
const { getJobDetails, getPendingJobs, getPendingApplications } = require('../controllers/jobController.js');

router.post("/getJobDetails", getJobDetails);
router.get("/getPendingJobs", getPendingJobs);
router.get("/getPendingApplications", getPendingApplications);

module.exports = router;