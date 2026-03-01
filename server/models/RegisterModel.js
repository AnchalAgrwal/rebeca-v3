const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        event: {
            type: String,
            trim: true,
            required: true
        },
        teamName: {
            type: String,
            trim: true,
            default: ""
        },
        teamMem: [
            {
                name: { type: String, required: true, trim: true },
                phone: { type: String, required: true, trim: true }
            }
        ],
        assetUpload: {
            type: String,   
            trim: true
        },
        paymentSS: {
            type: String,
            trim: true,
            required: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Register", registerSchema);