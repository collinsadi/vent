const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({

    usersname:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    reports: {
        type: [String],
        default: []
    },
    blocked: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
    }

}, {timestamps: true})


const User = mongoose.model("user", userSchema)


module.exports = User