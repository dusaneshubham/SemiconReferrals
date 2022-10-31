const multer = require('multer');

const resumeStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/resume');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

const upload = multer({ storage: resumeStorage });

module.exports = upload;