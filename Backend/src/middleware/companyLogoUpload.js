const multer = require('multer');

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/images/companyLogo');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

const companyLogoUpload = multer({ storage: imageStorage });

module.exports = companyLogoUpload;