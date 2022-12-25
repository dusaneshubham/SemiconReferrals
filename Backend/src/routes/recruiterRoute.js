const express = require("express");
const router = express.Router();
const {
    registerRecruiter,
    loginRecruiter,
    updatePassword,
    getRecruiterDetails,
    removeSavedCandidate,
    getRecruiterDetailsById,
    updateProfile,
    updateProfileImage,
    jobPost,
    saveCandidateProfile,
    getSavedCandidate,
    getFollowers,
    removeFollower,
    getStatistics,
    getAllRecruiterDetails,
    getAllPostedJobs,
} = require("../controllers/recruiterController");
const companyLogoUpload = require("../middleware/companyLogoUpload");
const verifyToken = require("../middleware/verifyToken");

// registration
router.post("/register/", registerRecruiter);
router.post("/login/", loginRecruiter);
router.post("/update-password", updatePassword);
router.post("/getRecruiterDetails", verifyToken, getRecruiterDetails);
router.post("/getRecruiterDetailsById", getRecruiterDetailsById);
router.post("/updateProfile", verifyToken, updateProfile);
router.post(
    "/updateProfileImage",
    companyLogoUpload.single("companyLogo"),
    verifyToken,
    updateProfileImage
);
router.post("/jobPost", verifyToken, jobPost);
router.post("/saveCandidateProfile", verifyToken, saveCandidateProfile);
router.post("/getSavedCandidate", verifyToken, getSavedCandidate);
router.post("/removeSavedCandidate", verifyToken, removeSavedCandidate);
router.post("/getFollowers", verifyToken, getFollowers);
router.post("/removeFollower", verifyToken, removeFollower);
router.post("/statistics", verifyToken, getStatistics);
router.get("/getAllRecruiterDetails", getAllRecruiterDetails);
router.post("/getAllPostedJobs", verifyToken, getAllPostedJobs);

module.exports = router;