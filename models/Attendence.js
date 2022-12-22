const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    foculty: {
        type: String,
        required: true,
    },
    minxada: {
        type: Number,
        required: true,
    },


})

const User = mongoose.model("User",  userSchema)
module.exports = User;