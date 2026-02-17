const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Missing Field: name"],
            trim: true,
        },
        image: {
            type: String,
            required: [true, "Missing Field: image"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Missing Field: Email"],
            trim: true,
            unique: true
        },
        phone: {
            type: String,
        },
        dept: {
            type: String,
            trim: true,
            validate: {
                validator: (x) => x.length > 5,
                message: "ERR: dept: Department Name too short."
            }
        },
        college: {
            type: String
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true // Allows admins who don't have a Google ID yet to exist
        },
        passout_year: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);