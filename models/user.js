'use strict';
const {
  Model
} = require('sequelize');
const { encrypt } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {foreignKey: 'authorId'});
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail:{
          args:true,
          msg:"Email harus diisi"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        isLength(password) {
          if(password.length < 5) {
            throw new Error ('Password minimal 5 character')
          }
        }
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate : (user) => { // buat enkripsi password sebelum disave kedalam database
        // let salt = bcrypt.genSaltSync(10);
        // let hash = bcrypt.hashSync(user.password, salt)
        user.password = encrypt(user.password); // proses hash sync
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};