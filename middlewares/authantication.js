const { validToken } = require("../services/authantication")

function CheckForAuthenticationCookie(cookieToken)
{
    return(req , res , next) => {
        const tokenCookieValue = req.cookies[cookieToken]

        if(!tokenCookieValue){
            return next()
        }

        try {
            const UserPayload = validToken(tokenCookieValue)
            req.user = UserPayload
        } catch (error) {
            console.log("Invalid Token");
            
        }
            return next()
    }
}

module.exports = {
    CheckForAuthenticationCookie,
}