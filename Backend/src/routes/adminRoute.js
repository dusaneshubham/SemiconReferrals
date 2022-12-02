const express = require('express');
const { loginAdmin, approveCompany, rejectCompany, blockCompany, unblockCompany, rejectPost, approvePost, registerAdmin, getStatistics, rejectJobApplication, approveJobApplication, updatePassword } = require('../controllers/adminController.js');
const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/update-password", updatePassword)
router.post("/approvecompany", approveCompany);
router.post("/rejectcompany", rejectCompany);
router.post("/blockcompany", blockCompany);
router.post("/unblockcompany", unblockCompany);
router.post("/rejectPost", rejectPost);
router.post("/approvePost", approvePost);
router.get("/statistics", getStatistics);
router.post("/approveJobApplication", approveJobApplication);
router.post("/rejectJobApplication", rejectJobApplication);

module.exports = router;