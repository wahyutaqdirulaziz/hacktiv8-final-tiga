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
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Gender tidak boleh kosong'
        },
        isIn : {
          args : [['pria', 'wanita']],
          msg: 'Gender harus diisi pria atau wanita'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Role tidak boleh kosong'
        },
        isIn: {
          args: [['admin', 'customer']],
          msg: 'Role harus diisi admin atau customer'
        }
      }
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: {
          msg: 'Balance tidak boleh kosong'
        },
        isInt: true,
        max: {
          args: [100000000],
          msg: 'Topup maximal hanya boleh 100000000'
        },
        min: {
          args: [0],
          msg: 'Topup minimal 0'
        }
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
      beforeCreate: (User) => {
        User.balance = '0';
      }
    }
  }, {
    tableName: 'Users'
  })
  return User;
}