const jwt = require('jsonwebtoken')

function sign(user){
    return jwt.sign(user, process.env.jwt_SECRET)
}

function decode(tokenSign){
    return jwt.verify(tokenSign, process.env.jwt_SECRET)
}

module.exports = {sign, decode}