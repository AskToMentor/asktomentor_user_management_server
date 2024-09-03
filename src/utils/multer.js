const multer = require("multer");
// const ApiError = require( "../utils/apiError.js");

// const {
//     statusCodeObject, errorAndSuccessCodeConfiguration
// } = require( "../utils/constants.js");

const storage = multer.memoryStorage();

const upload = multer({
    fileFilter: function (req, file, cb) {
        console.log("file", file);
        // Accept specified file types
        const allowedMimes = [ 
            "image/jpeg",
            "image/jpg",
            "image/png",
            "application/pdf",
            "text/csv",
            "image/webp"
        ];

        if (allowedMimes.includes(file.mimetype)) 
            cb(null, true);
        else 
            // cb(new ApiError(statusCodeObject.HTTP_UNPROCESSABLE_ENTITY, errorAndSuccessCodeConfiguration.HTTP_UNPROCESSABLE_ENTITY, "Invalid file type. Only JPEG, JPG, PNG, PDF, and CSV files are allowed."));
            cb(new Error("Invalid file type. Only JPEG, JPG, PNG, PDF, and CSV files are allowed."));
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB file size limit
    },
    storage: storage
});

module.exports =  upload;
