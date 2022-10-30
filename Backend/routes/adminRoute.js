const express = require('express');
const { loginAdmin, approveCompany, rejectCompany, blockCompany, unblockCompany, rejectPost, approvePost, registerAdmin } = require('../controllers/adminController.js');
const admin = require('../models/admin.js');
const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/approvecompany", approveCompany);
router.post("/rejectcompany", rejectCompany);
router.post("/blockcompany", blockCompany);
router.post("/unblockcompany", unblockCompany);
router.post("/rejectpost", rejectPost);
router.post("/approvepost", approvePost);

module.exports = router;