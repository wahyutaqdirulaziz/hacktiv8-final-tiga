'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Category.init({
    type:{
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
            msg: 'Please enter your type !'
        },
        notEmpty: {
            msg: 'Please enter your type !'
        }
    }
    },
    sold_product_amount: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
            msg: 'Please enter your Product amount !'
        },
        notEmpty: {
            msg: 'Please enter your Product amount !'
        },
        isInt: {
          msg: "Product number required number !"
        }
    }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};