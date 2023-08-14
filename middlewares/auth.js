


const checkLogin = async (request, response, next)=>{

    const user = request.body.user
    
    if (!user) {
        
        return response.status(401).json({status: false, message: "unauthorized"})
    }

    request.user = user
    next()

}


module.exports = {checkLogin}