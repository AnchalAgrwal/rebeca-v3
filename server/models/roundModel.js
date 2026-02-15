const mongoose = require("mongoose");

const roundSchema = new mongoose.Schema(
    {
        no: {
            type: Number
        },
        name: {
            type: String,
            trim: true
        },
        start: {
            type: Date
        },
        end: {
            type: Date
        },
        venue: {
            type: String
        }
    }
)

module.exports = mongoose.model("Round", roundSchema)