const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const uploadToCloudinary = require("../utils/cloudinary").uploadToCloudinary;
const deleteFromCloudinary = require("../utils/cloudinary").deleteFromCloudinary;

exports.updateUser = catchAsync(async (req, res, next) => {
    console.log("request for user update received");
    console.log("Req.body:", req.body);
    console.log("Req.file:", req.file);
    try {
        // user profile image is not needed as of now
        // if (req.file) {
        //     // delete old image from cloudinary if it exists and is a cloudinary URL
        //     if (req.body.oldImage) {
        //         console.log("Existing image found, preparing to delete from Cloudinary:", req.body.oldImage);
        //         // Extract Public ID: Get the part between the last '/' and the file extension
        //         const publicId = req.body.oldImage.split("/").pop().split(".")[0];
        //         const folderPath = "admin_profiles/";
        //         await deleteFromCloudinary(`${folderPath}${publicId}`);
        //     }
        //     console.log("File received for upload:", req.file.buffer);
        //     const result = await uploadToCloudinary(req.file.buffer, "admin_profiles");
        //     console.log("Image uploaded to Cloudinary:", result);
        //     req.body.image = result;
        // }
        const Id = req.body.id;
        const updation = await User.findByIdAndUpdate(Id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updation) {
            return next(new AppError("No user found with that ID", 404));
        }

        res.status(200).json({
            status: "success",
            data: {
                user: updation,
            },
        });
    } catch (err) {
        console.log("Error during user update:", err);
        res.status(500).json({
            status: "error",
            message: err.message || "An error occurred while updating the admin profile.",
        });
    }
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
    console.log("GetAllUsers request received");
    try {
        const users = await User.find();
        res.status(200).json({
            status: "success",
            users: users,
        });
    } catch (err) {
        next(err);
    }
});
