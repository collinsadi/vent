const express = require("express")
const router = express.Router()

const {getChats,deleteChat} = require("../controllers/chatControllers")

const { checkLogin } = require("../middlewares/auth")

router.get("/chats", checkLogin, getChats)
router.post("/chats/:id", checkLogin, deleteChat)



module.exports = router