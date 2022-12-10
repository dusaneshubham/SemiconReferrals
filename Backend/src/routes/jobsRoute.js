const express = require('express');
const router = express.Router();
const { getJobDetails, getPendingJobs, getPendingApplications, getAllJobDetails } = require('../controllers/jobController.js');

router.post("/getJobDetails", getJobDetails);
router.get("/getAllJobDetails", getAllJobDetails);
// router.post("/getAllJobDetailsFilters", getAllJobDetailsFilters);
router.get("/getPendingJobs", getPendingJobs);
router.get("/getPendingApplications", getPendingApplications);

module.exports = router;