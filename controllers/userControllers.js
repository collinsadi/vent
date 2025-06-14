const bcrypt = require("bcrypt")
const User = require("../models/usermodel")
const jwt = require("jsonwebtoken")
const jwtsecret = "secretvent"


const createUser = async (request, response) => {
    
   let {usersname,password} = request.body

    try {
        
        if (!usersname) {
        
            return response.status(422).json({status: false, message: "Users Username is Missing"})
        }

        if(!password){

            return response.status(422).json({status: false, message: "Users Password is Missing"})
        }


        if (usersname.split(" ").length > 0){

            usersname = usersname.split(" ").join("")
            
        }

        const userExists = await User.findOne({ usersname:usersname.toLowerCase() })
        
        if(userExists){

            return response.status(401).json({status: false, message: "Username is Not Available"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        
        const user = await User.create({usersname:usersname.toLowerCase(), password:hashedPassword})

        const token = jwt.sign({user},jwtsecret)

        user.token = token

        await user.save()

        response.cookie("auth",token,{httpOnly:true})

        response.status(201).json({status: true, message:"User Created Sucessfully", user})




    }catch(error){

        response.status(500).json({status: false , message: "Internal Server Error"})
        //console.log(error)
    }

}

const loginUser = async (request, response) => {

    let { usersname, password } = request.body
    

    try {
        
     if (!usersname) {
        
            return response.status(422).json({status: false, message: "Users Username is Missing"})
        }

        if(!password){

            return response.status(422).json({status: false, message: "Users Password is Missing"})
        }


         if (usersname.split(" ").length > 0){

            usersname = usersname.split(" ").join("")
            
        }

        const user = await User.findOne({ usersname:usersname.toLowerCase() })
        
        if(!user){

            return response.status(401).json({status:false, message:"Invalid Credentials"})
        }
        

        const passwordIsValid = await bcrypt.compare(password, user.password)

        if (!passwordIsValid) {
            
            return response.status(401).json({status:false, message:"Invalid Credentials"})
        }

          response.cookie("auth",user.token,{httpOnly:true})

        response.status(200).json({status:true, message:"Login Sucessful", user})



    }catch(error){

        response.status(500).json({status:false, message:"Internal Server Error"})
        console.log(error)
    }
    
}

const deleteUser = async (request, response) => {
    
    response.send("Route In Construction")

}

const reportUser = async (request, response) => {
    
    const userid = request.params.id
    const id = request.user

    try {

        const user = await User.findById(userid)

        if(!user){

            return response.status({status:false, message:"an Error Occured"})
        }

        const alreadyReported = user.reports.includes(id)

        if(alreadyReported){

            return response.status(401).json({status:false, message:"You Can Not Report One User Twice"})
        }

       

        user.reports.push(id)

        if (user.reports.length >= 10) {
            
            user.blocked = true
        }

        await user.save()

        response.status(200).json({status:true, message:"User Reported Sucessfully"})

    } catch (error) {
        
        response.status(500).json({status:false, message:"Internal Server Error"})
        //console.log(error)
    }

}

const findAllUsers = async (request, response) => {
    
    const users = await User.find({ blocked: false, $and:[{_id:{$ne:request.user}}] }).sort({createdAt: -1})
    
    response.status(200).json({users})
}

module.exports = {createUser,loginUser,deleteUser,reportUser,findAllUsers}