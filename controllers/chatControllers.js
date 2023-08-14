const Chat = require("../models/chats")
const Message = require("../models/message")



const getChats = async (request, response) => {

    const from = request.user

    try{

    const chats = await Chat.find({from}).sort({createdAt:-1}).populate("to","usersname")


        response.status(200).json({status:true, chats})


    }catch(error){

        response.status(500).json({status:false, message:"Internal Server Error"})
        console.log(error)
    }


}

const deleteChat = async (request, response) => {

    const id = request.params.id
    const from = request.user

    try {
    
        const chat = await Chat.findById(id)
        
        if(!chat){

            return response.status(404).json({status:false, message:"Chat Not Found"})
        }

        if (chat.from != from) {
            
            return response.status(401).json({status:false, message:"Unauthorized Request"})
        }

        await Chat.findByIdAndDelete(id)


        response.status(201).json({status:true, message:"Chat Deleted Sucessfully"})



    } catch (error) {
        
        response.status(500).json({status:false, message:"Internal Server Errror"})
        console.log(error)
    }


}


module.exports = {getChats,deleteChat}