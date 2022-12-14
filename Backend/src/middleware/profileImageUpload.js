const multer = require('multer');

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/images/profileImages');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

const uploadProfileImage = multer({ storage: imageStorage });

module.exports = uploadProfileImage;