module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Nama tidak boleh kosong'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Email tidak valid'
        },
        notNull: {
          msg: 'Email tidak boleh kosong'
        }
      },
      unique: {
        msg: 'Email sudah digunakan'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password tidak boleh kosong'
        },
        min: 6,
        max: 10
      }
    },
    gender: {
      type: DataTypes.STRING,
      values: ['male', 'female'],
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Gender tidak boleh kosong'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Role tidak boleh kosong'
        }
      }
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Balance tidak boleh kosong'
        },
        isInt: true,
        max: 100000000,
        min: 0
      }
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
    hooks: {
      beforeValidate: (User, options) => {
        User.balance = '0';
      }
    }
  }, {
    tableName: 'Users'
  })
  return User;
}