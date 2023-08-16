const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const chatSchema = new Schema({

    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    lastmessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "message"
    }


}, { timestamps: true })

const Chat = mongoose.model("chat", chatSchema)

module.exports = Chat