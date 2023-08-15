const express = require("express")
const router = express.Router()

router.get("/", (request, response) => {
    
    response.render("index")
})
router.get("/join", (request, response) => {
    
    response.render("join")
})
router.get("/me/chats", (request, response) => {
    
     response.render("chat")

    
})

router.get("/me/chats/:id", (request, response) => {

    response.render("conversation")
    
})

module.exports = router