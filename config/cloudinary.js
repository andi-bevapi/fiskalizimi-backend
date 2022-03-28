require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "darhtql7y",
    api_key: 488526249336735,
    api_secret: "cYA-3CsZEWxLidxjts1scFbAkXI"
});

module.exports = { cloudinary };