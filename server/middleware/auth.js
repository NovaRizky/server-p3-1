var jwt = require('jsonwebtoken');
const {User} = require("../models/index.js")

const authentication = (req,res,next) =>{
    if (!req.headers.access_token)
        return res.status(401).json({ success: false, message: 'Missing access token' })
    try{
        let decode = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
        req.userId = decode.id
        req.userRole= decode.role

        User.findOne({where:{id:req.userId}})
        .then((user) => {
            if (user) {
                    // console.log(user, "iniiiii");
                    next()
                } else {
                    next({ status: 404, message: "Brocken access token" })
                }
            })
    }
    catch{
        console.log(err)
        next(err)
    }
}


module.exports={authentication}