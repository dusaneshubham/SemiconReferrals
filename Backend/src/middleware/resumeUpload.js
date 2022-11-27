const multer = require('multer');

const resumeStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/resume');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

const upload = multer({
    storage: resumeStorage,
});

// const upload = multer({
//     storage: resumeStorage,
//     limits: {
//         fileSize: 2000000 // max file size 2MB = 2000000 bytes
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
//             return cb(
//                 new Error(
//                     'Only upload files with pdf, doc, docx format.'
//                 )
//             );
//         }
//         cb(undefined, true); // continue with upload
//     }
// });

module.exports = upload;