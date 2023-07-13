const mongoose = require("mongoose");

const shortId = require("short-id");

const shortURlScheme = new mongoose.Schema({
    full: {
        type: String,
        required: true,
    },
    short: {
        type: String,
        required: true,
        // default: shortId.generate,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
});

module.exports = mongoose.model("ShortURL", shortURlScheme);
