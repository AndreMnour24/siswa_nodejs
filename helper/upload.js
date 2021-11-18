const multer = require('multer')

exports.uploadImage = multer({
    fileFilter: (req, file, callback) => {
        if (file.mimetype.substr(0, 5) === 'image') {
            return callback(null, true)
        }
        return callback(new Error("Only image type is allowed"))
    },
    limits: {
        fileSize: 10 * 1024 * 1024,
    }
})