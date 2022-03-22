const { Post, User, Category, Tags } = require("../models/index.js")

class ControllerTag {
    static getAllTags(req, res, next){
        Tags.findAll({include:[Post]})
        .then((data) =>{
            if(data.length !==0){
                res.status(200).json({
                    tags: data
                })
            }else{
                res.status(404).json({message: 'Data not found'})
            }
        })
        .catch((err) => {
            // console.log(err);
            next(err)
        })
    }

    static addTag (req, res, next) {
        let input = {
            postId : req.body.postId,
            name : req.body.name
        }
        Tags.create(input)
        .then((data) => {
            res.status(201).json(data)
        })
        .catch((err) => {
            // console.log(err);
            next(err)
        })
    }

    static deleteTag (req, res, next) {
        let id = req.params.id
        Tags.destroy({where:{id}})
        .then((data) => {
            res.status(200).json({ msg: 'Delete Tags data success'})
        })
        .catch((err) => {
            // console.log(err);
            next(err)
        })
    }

}

module.exports = ControllerTag