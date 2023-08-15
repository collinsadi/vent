const jwt = require("jsonwebtoken")
const jwtsecret = "secretvent"



const checkLogin = async (request, response, next)=>{

    // const user = request.body.user

    const token = request.cookies.auth
    
    if (!token) {
        
        return response.status(401).json({status: false, message: "unauthorized"})
    }

    try{

        const decoded = jwt.verify(token,jwtsecret)

        request.user = decoded.user._id
        next()


    } catch (error) {
        console.log(error)
        response.status(401).json({status: false, message: "unauthorized"})
    }

   

}


module.exports = {checkLogin}