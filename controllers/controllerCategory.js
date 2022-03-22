const { Post, User, Category } = require("../models/index.js")

class ControllerCategory {
    static getAllCategory (req, res, next){
        Category.findAll()
        .then((data) =>{
            if(data.length !==0){
                res.status(200).json({
                    categories: data
                })
            }else{
                res.status(404).json({message: "Data not found"})
            }
        })
        .catch((err) => {
            next(err)
        })
    }

    static addCategory (req, res, next) {
        let input = {
            name : req.body.name
        }
        Category.create(input)
        .then(data => {
            res.status(201).json({
                categories : data
            })
        })
        .catch((err) => {
            next(err)
        })
    }

    static getOneCategory (req, res, next) {
        let id= req.params.id
       Category.findOne({where:{id}})
        .then((data) =>{
            console.log(data)
            res.status(200).json(data)
        })
        .catch((err) => {
            console.log(err);
            next(err)
        })
    }

    static updateCategory (req, res, next) {
        let id = req.params.id
        let input ={
            name : req.body.name
        }
        Category.update(input,{where:{id}, returning : true})
        .then((data) =>{
            res.status(201).json({
                message: "Update category success",
                categories: data
            })
        })
        .catch((err) => {
            console.log(err);
            next(err)
        })
    }

    static deleteCategory (req, res, next) {
        let id = req.params.id
        Category.destroy({where:{id}})
        .then((data) => {
            console.log(data, "delete category");
            res.status(200).json({
                message: "Delete category success"
            })
        })
        .catch((err) => {
            console.log(err);
            next(err)
        })
    }
}

module.exports = ControllerCategory