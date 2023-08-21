const express = require("express")
const router = express.Router()
const User = require("../models/usermodel")
const jwt = require("jsonwebtoken")
const jwtsecret = "secretvent"



const authRoute = (request, response,next) => {
    
     const token = request.cookies.auth
    
    if (!token) {
        
        return response.render("login")
    }

    try{

        const decoded = jwt.verify(token,jwtsecret)

        request.user = decoded.user._id
        next()


    } catch (error) {
        //console.log(error)
        response.render("login")
    }
}



router.get("/", (request, response) => {
    
    response.render("index")
})
router.get("/join", (request, response) => {
    
    response.render("join")
})
router.get("/me/chats",authRoute, (request, response) => {
    
     response.render("chat")

    
})

router.get("/me/chats/:id", authRoute, async (request, response) => {

    const id = request.params.id

    //console.log(id)

    try{

        const user = await User.findById(id)
        if (!user) {
    
        return response.redirect("/me/chats")
       
    }


    } catch (error) {
        //console.log(error)
         return response.redirect("/me/chats")
    }
    
    

    response.render("conversation")
    
})
router.get("/login", (request, response) => {

    response.render("login")
    
})
router.get("/terms", (request, response) => {

    response.render("terms")
    
})

module.exports = router