const express = require("express")
const router = express.Router()
const {createUser,loginUser,deleteUser,reportUser,findAllUsers} = require("../controllers/userControllers")
const { checkLogin } = require("../middlewares/auth")


router.post("/user/signup", createUser)
router.post("/user/login", loginUser)
router.post("/user/delete/:userid", deleteUser)
router.post("/user/report/:id",checkLogin, reportUser)
router.get("/users",checkLogin, findAllUsers)


module.exports = router