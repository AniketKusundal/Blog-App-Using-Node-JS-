const jwt = require('jsonwebtoken')
const SecrateKey = process.env.JWT_SECRATE_KEY

function CreateTokenForUser(user) {
    const payload = {
        _id : user._id,
        email : user.email,
        role : user.role,
        profilePhoto : user.profilePhoto
    }

    const token = jwt.sign(payload , SecrateKey);
    return token;
}

function validToken(token) {
    const payload = jwt.verify(token , SecrateKey)
    return payload;
}


module.exports = {
    CreateTokenForUser,
    validToken
}