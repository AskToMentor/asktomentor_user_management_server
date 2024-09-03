const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
    // Use the original file name with a timestamp to make it unique
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);

        cb(null, file.fieldname + "-" + uniqueSuffix + extension);
    }
});

const upload_csv = multer({
    fileFilter: function (req, file, cb) {
        console.log("file", file);
        // Accept specified file types
        const allowedMimes = [ 
            "image/jpeg",
            "image/jpg",
            "image/png",
            "application/pdf",
            "text/csv" 
        ];

        if (allowedMimes.includes(file.mimetype)) 
            cb(null, true);
        else 
            cb(new Error("Invalid file type. Only JPEG, JPG, PNG, PDF, and CSV files are allowed."));
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB file size limit
    },
    storage: storage
});

module.exports =  upload_csv;
