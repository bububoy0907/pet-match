const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');

cloudinary.config({ cloud_name, api_key, api_secret });

const storage = multer.diskStorage({});
const upload = multer({ storage });

const uploadCloudinary = async (req, res, next) => {
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    req.body.imageUrl = result.secure_url;
  }
  next();
};

module.exports = { upload, uploadCloudinary };
