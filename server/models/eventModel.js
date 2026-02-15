const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Missing Field: Event name"],
            trim: true,
        },
        desc: {
            type: String,
            required: [true, "Missing field: description"],
        },
        rounds: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Round",
        },
        registration: {
            type: String,
            trim: true,
        },
        minTeamSize: {
            type: Number,
            required: function () {
                return this.type === "team";
            },
            validate: {
                validator: function (value) {
                    return this.maxTeamSize ? value <= this.maxTeamSize : true; // Ensure minTeamSize ≤ maxTeamSize
                },
                message: "Validation err: minteamsize: Minimum team size cannot exceed maximum team size",
            },
        },
        maxTeamSize: {
            type: Number,
            required: function () {
                return this.type === "team";
            },
            min: [2, "Validation errMaximum team size must be at least 2"],
            validate: {
                validator: function (value) {
                    return this.minTeamSize ? value >= this.minTeamSize : true; // Ensure maxTeamSize ≥ minTeamSize
                },
                message: "Maximum team size cannot be smaller than minimum team size",
            },
        },
        type: {
            type: String,
            required: [true, "Event type is required"],
            enum: {
                values: ["team", "single"],
                message: 'Type must be either "team" or "single"',
            },
        },
        poster: {
            type: String,
            required: [true, "Poster URL is required"],
            validate: {
                validator: function (value) {
                    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/i.test(value);
                },
                message: "Invalid URL for poster",
            },
        },
        thumbnail: {
            type: String,
            required: [true, "ThumbNail URL is required"],
            validate: {
                validator: function (value) {
                    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/i.test(value);
                },
                message: "Invalid URL for thumbnail",
            },
        },
        regfee: {
            type: Number,
            required: [true, "Registration fee is required"],
        },
        coords: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Admin",
            validate: {
                validator: function (coordinators) {
                    return coordinators.length > 0;
                },
                message: "There must be at least one main coordinator",
            },
        },
    },
    { timestamps: true },
); // Adds createdAt and updatedAt fields

module.exports = mongoose.model("Event", eventSchema);
