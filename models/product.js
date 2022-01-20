module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Judul tidak boleh kosong'
        }
      }
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Harga tidak boleh kosong'
        },
        isInt: true,
        min: 0,
        max: {
          args: 50000000,
          msg: 'Harga tidak boleh kurang dari 50000000'
        }
      }
    },
    stock: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Stok tidak boleh kosong'
        },
        isInt: true,
        min: {
          args: 5,
          msg: 'Stok tidak boleh kurang dari 5'
        }
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
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

  Product.associate = models => {
    Product.belongsTo(models.Category, {
      foreignKey: 'categoryId'
    });
  }
  return Product;
}
