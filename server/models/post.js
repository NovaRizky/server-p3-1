'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {foreignKey: 'authorId'})
      Post.belongsTo(models.Category, {foreignKey: 'categoryId'})
      Post.hasMany(models.Tags, {foreignKey: "postId"})
    }
    formatSlug() {
      let title = this.title.split(" ").join("-")
      console.log(title)
      return title
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg: 'title harus diisi'
        }
      }
    },
    slug: DataTypes.STRING,
    content: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    hooks:{
      beforeCreate:(Post)=>{
        Post.slug = Post.formatSlug()
      },
      beforeUpdate:(Post)=>{
        Post.slug = Post.formatSlug()
      }
    },
    sequelize,
    modelName: 'Post',
  });
  return Post;
};