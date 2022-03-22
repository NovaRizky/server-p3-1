const {User} = require('../models')
const jwt = require('jsonwebtoken')
const { decrypt } = require('../helpers/bcrypt')

class ControllerUser{
    static register(req, res, next){
        let input = {
            username : req.body.username,
            email : req.body.email,
            password : req.body.password,
            role : req.body.role,
            phoneNumber : req.body.phoneNumber,
            address : req.body.address
        }
        User.create(input)
        .then((data) =>{
            // console.log(data, "-----");
            res.status(200).json({
                access_token : jwt.sign({username:data.username,email:data.email, role:data.role}, process.env.JWT_SECRET),
                users: data
            })
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err)})
    }
    
    static login(req, res, next){
        const {email, password} =req.body
        User.findOne({ where: {email}})
        .then((user) => {
            if (user && decrypt(password, user.password)) { // jika usernya ada
                const access_token = jwt.sign({ id: user.id, username : user.username, role: user.role, phoneNumber: user.phoneNumber, addres : user.addres },process.env.JWT_SECRET);
                res.status(200).json({ success: true, message: "login success", access_token});
            }else {
                throw { name: "WRONG_EMAIL_AND_PW" };
            }
        })
        .catch((err) => {
            // console.log(err);
            res.status(401).json({message:'Invalid email or password'})
        })

    }
    static getAllUser(req,res){
        User.findAll()
        .then((data) =>{
            // console.log(data, "all user");
            if(data.length === 0){
                res.status(404).json({message: "Data not found"})
            }else{
                res.status(200).json(data)
            }
        })
        .catch(err => res.status(500).json(err))
    }
}

module.exports = ControllerUser
