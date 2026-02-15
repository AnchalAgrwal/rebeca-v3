const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config()


// config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// helper
const uploadToCloudinary = (fileBuffer, folder_name) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder_name || "user_profiles", // Organizes your Cloudinary storage
                resource_type: "auto",
            },
            (error, result) => {
                if (result)
                    resolve(result.secure_url); // Returns the HTTPS link
                else reject(error);
            },
        );
        uploadStream.end(fileBuffer);
    });
};

const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId); 
        console.log("Cloudinary image deleted: ", result);
        return result;
    } catch (error) {
        console.log("Error deleting from Cloudinary: ", error);
        throw error;
    }
};

module.exports = {
    uploadToCloudinary,
    deleteFromCloudinary,
};
