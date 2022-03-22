require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: '488526249336735',
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = { cloudinary };