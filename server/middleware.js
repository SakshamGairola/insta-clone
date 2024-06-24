import multer from 'multer';

// Multer middleware for handling file uploads
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/'); // Uploads will be stored in the 'uploads/' directory
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname); // Unique filename based on timestamp
	},
});

const fileSizeCheck = multer({
	storage: storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit (in bytes)
});

export default fileSizeCheck;
