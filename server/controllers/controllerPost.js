const { Post, User, Category, Tags, sequelize } = require("../models/index.js")
const { QueryTypes } = require("sequelize");

class ControllerPost {
    static getAllPost (req, res, next) {
        Post.findAll({
            include:[
                {model: User,Category, Tags}
            ], 
            order:[
                ['updatedAt', 'DESC']
            ]
        })
       .then((post) =>{
        if(post.length !==0){
            res.status(200).json({
                posts: post
            })
        }else{
            res.status(404).json({message: 'Data not found'})
            }
        })
        .catch((err) => {
            console.log(err);
            // next(err)
        });
    }
    // static addPost (req, res, next) {
    //     let input = {
    //         title : req.body.title,
    //         content: req.body.content,
    //         imgUrl:req.body.imgUrl,
    //         categoryId: req.body.categoryId,
    //         authorId: req.userId
    //     }
    //     Post.create(input)
    //     .then((data) => {
    //         res.status(201).json({
    //             posts: data
    //         })
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         next(err)
    //     });

    // }

    static editPost (req, res, next) {
        let id = req.params.id
        let input ={
            title : req.body.title,
            content: req.body.content,
            imgUrl:req.body.imgUrl,
            categoryId: req.body.categoryId,
            authorId: req.userId
        }
        console.log(input, "===");
        Post.update(input, { where: {id}, returning : true, individualHooks:true })
        .then((data)=>{
            console.log(data, "edittt");
            res.status(201).json({posts: data})
        })
        .catch((err) => {
            console.log(err);
            next(err)
        });
    }

    static deletePost (req, res, next) {
        let id = req.params.id
        Post.destroy({ where:{id} })
        .then((data) => {
            console.log(data);
            res.status(200).json({
                message : `success delete Post`
            })
        })
        .catch((err) => {
            console.log(err);
            next(err)
        });
    }

    static getOnePost (req, res, next) {
        let id= req.params.id
        Post.findOne({include:[User, Category],where:{id}})
        .then((data) =>{
            console.log(data, "get one post")
            res.status(200).json({posts:data})
        })
        .catch((err) => {
            console.log(err);
            next(err)
        });
    }

    static async addPost (req,res) {
        const t = await sequelize.transaction();
        try {
            const post = await Post.create({
                title : req.body.title,
                content: req.body.content,
                imgUrl:req.body.imgUrl,
                categoryId: req.body.categoryId,
                authorId: req.userId,
                tag: req.body.tag
            }, { transaction: t })
      
            const tag = await Tags.create({postId: post.id, name: req.body.tag}, {transaction:t});
            console.log(post, tag, "/////");

            await t.commit();
            res.status(201).json({post, tag});

        } catch (err) {
            await t.rollback();
            res.status(500).json(err);
        }
    }

    static async searchTitle(req, res, next) {
        const { search } = req.body;
        try {
          const input = await sequelize.query(
            `  SELECT p."tag"
                FROM "Posts" as p
                JOIN "Tags" as t
                ON t."postId" = p."id"
                WHERE t.name LIKE '%${search}%';`,
            {
              logging: console.log,
              plain: false,
              raw: false,
              type: QueryTypes.SELECT,
            }
          )
          res.status(200).json({ posts: input });
        } catch (err) {
          console.log(err);
          next(err);
        }
    }

    static getPosts (req, res, next) {
        Post.findAll({include:[{
            model: User, Category
        }], 
            limit: 3
        })
         .then(data =>{
             console.log(data, "dataa 3")
             res.status(200).json(data)
         })
         .catch((err) => {
             console.log(err);
         next(err);
         })
     }
}

module.exports = ControllerPost
