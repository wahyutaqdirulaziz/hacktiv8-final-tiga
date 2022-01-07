module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.NUMBER
      },
      stock: {
        type: DataTypes.NUMBER
      },
      category_id: {
        type: DataTypes.NUMBER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
  }, {
    tableName: 'Products'
  })
  return Product;
}