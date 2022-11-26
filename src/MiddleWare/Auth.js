const jwt = require('jsonwebtoken');

const authenticate = (req,res,next)=>{
    // fetch the token from the request header
    const token = req.header('user-auth-token')
    // return error if no token given from the header and terminate the request. 
    if(!token){
        return res.status(401).json({
            status:"Error",
            data: [{msg:'No Token, authorization denied'}]
        })
    }else{
        try{
            // validate the token
            const decode = jwt.verify(token,'password')
            req.user = {
                email:decode.email,
                id:decode.id
            }
            next();
        }catch(error){
            return res.status(500).json({
                status:'Error',
                data:[{msg:'Invalid token, authorization denied'}]
            })
        }
    }
}

module.exports = authenticate;