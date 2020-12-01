'use strict';
const {
  Model
} = require('sequelize');

const user = require("./user");
const category = require("./category");
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      books.belongsTo(models.user,{
        include:{
          as:"user",
          foreignKey:{
            name:"userid"
          }
        }
      });

      books.belongsTo(models.category,{
        include:{
          as:"category",
          foreignKey:{
            name:"categoryid"
          }
        }
      });

    }
  };
  books.init({
    title: DataTypes.STRING,
    publication: DataTypes.STRING,
    pages: DataTypes.STRING,
    isbn: DataTypes.STRING,
    about: DataTypes.TEXT,
    file: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'books',
  });
  return books;
};