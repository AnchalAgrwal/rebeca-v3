const multer = require("multer");
const AppError = require("../utils/appError");

// Store file in memory as a Buffer
const storage = multer.memoryStorage();

// Filter to ensure only images are uploaded
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new AppError("Not an image! Please upload only images.", 400), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = upload;
