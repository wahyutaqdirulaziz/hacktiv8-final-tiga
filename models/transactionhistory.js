'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TransactionHistory.init({
    product_id: DataTypes.NUMBER,
    user_id: DataTypes.NUMBER,
    quantity: DataTypes.NUMBER,
    total_price: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'TransactionHistory',
  });
  return TransactionHistory;
};