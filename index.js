const express = require("express")
const app = express()
const mongoose = require("mongoose")
const morgan = require("morgan")
const cookieparser = require("cookie-parser")


/**
 * Routes
 */

const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoutes")
const chatRoutes = require("./routes/chatRoutes")
const pageRoutes = require("./routes/pageRoutes")


const url = "mongodb://127.0.0.1:27017/vent"
const live = 'mongodb+srv://netninja:1020304050@cluster0.54vyixp.mongodb.net/vent?retryWrites=true&w=majority'
const port = process.env.PORT || 5000

app.listen(port, () => {
    
    console.log("Server Started at Port 5000")
})

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    
        console.log("Connected To MongoDB Sucessfully")
    })
    .catch(error => {
    
        console.log("Could Not Connect To MongoDB",error)
})


app.set("view engine", "ejs")
app.use(morgan("dev"))
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieparser())

// Use Routes

app.use(userRoutes)
app.use(messageRoutes)
app.use(chatRoutes)
app.use(pageRoutes)