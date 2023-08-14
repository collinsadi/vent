const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const messageSchema = new Schema({

    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    message: {
        type: String,
        required: true
    },
    deleted: {
        type:Boolean,
        default:false
    }


},{timestamps: true})

const Message = mongoose.model("message", messageSchema)

module.exports = Message