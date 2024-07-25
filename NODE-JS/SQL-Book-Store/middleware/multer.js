const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the directory exists
const destinationPath = path.join(__dirname, '../public/images/books');

const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, destinationPath);
    },
    filename: (req, file, callback) => {
        const fileName = file.originalname.split('.')[0].replace(/\s/g, '');
        const extension = path.extname(file.originalname);
        callback(null, Date.now() + "_" + fileName + extension);
    }
});

const upload = multer({ storage: fileStorage });

module.exports = upload.single('image');