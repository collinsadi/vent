const Message = require("../models/message")
const Chat = require("../models/chats")



const newMessage = async (request, response) => {

  const {to,message} = request.body
  const from = request.user

  try{

    if (!to) {
      
      return response.status(422).json({status:false, message:"Who Do You Wish to Send This Message to?"})
    }

    if (!message) {
      
      return response.status(422).json({status:false, message:"Message Body is Missing"})
    }

    const newmessage = await Message.create({ from, to, message })
    const messages = await Message.find().or([{to:from},{from}])

    const messageId = newmessage._id

 const chatExists = await Chat.findOne().or([{to:from},{from}])

    if (chatExists) {
      
      chatExists.lastmessage = message

      await chatExists.save()
    }

    if (!chatExists) {
      
      const chat = await Chat.create({from, to,lastmessage:message })

      await chat.save()
    }
    
    console.log(messages)

    await newmessage.save()

    response.status(201).json({status:true, message:"Message Created", messages})

  }catch(error){

    response.status(500).json({status:false, message:"Internal Server Error"})
    console.log(error)
  }


}

const deleteMessage = async (request, response) => {
 
  const id = request.params.id
  const from = request.user

  try {
    
    const message = await Message.findById(id)

    if(!message){

      return response.status(404).json({status:false, message:"Message Was not Found"})
    }

    if (message.from != from) {
      
      return response.status(401).json({status:false, message:"You can Only Delete Messages You Sent"})
    }

    message.deleted = true
    message.message = "This Message Was Deleted"

    await message.save()

    response.status(201).json({status:true, message:"Message Deleted Sucessfully"})

  }catch(error){

    response.status(500).json({status:false, message:"Internal Server Error"})
    console.log(error)
  }

}

const getMessage = async (request, response) => {
  response.send("Route In Construction")   

}

const editMessage = async (request, response) => {
  response.send("Route In Construction")   

}


module.exports = {newMessage, deleteMessage, getMessage, editMessage}