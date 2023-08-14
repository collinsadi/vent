const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const chatSchema = new Schema({

    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    lastmessage: {
        type:String
    }


}, { timestamps: true })

const Chat = mongoose.model("chat", chatSchema)

module.exports = Chat