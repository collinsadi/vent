const express = require("express")
const router = express.Router()

const { newMessage, deleteMessage, getMessage, editMessage } = require("../controllers/messageControllers")
const { checkLogin } = require("../middlewares/auth")



router.post("/message/new", checkLogin, newMessage)
router.post("/message/delete/:id", checkLogin, deleteMessage)
router.post("/message/get/:id", checkLogin, getMessage)
router.post("/message/edit/:id", checkLogin, editMessage)




module.exports = router