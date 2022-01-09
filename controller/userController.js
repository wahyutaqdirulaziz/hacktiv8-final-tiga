const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  User
} = require('../models');
const {
  JWT_SECRET_KEY
} = process.env;

class userController {
  static register = async (req, res) => {
    const {
      full_name,
      email,
      password,
      gender,
      role
    } = req.body;

    let newPassword = password;
    if (password !== undefined) {
      newPassword = await bcrypt.hash(password, 10);
    }

    await User.create({
      full_name,
      email,
      password: newPassword,
      gender,
      role: "customer"
    }).then(result => {
      let data = {
        id: result.id,
        full_name: result.full_name,
        email: result.email,
        gender: result.gender,
        balance: result.balance,
        createdAt: result.createdAt
      }
      return res.status(201).json({
        user: data
      })
    }).catch(error => {
      const err = error.errors
      const errorList = err.map(d => {
        let obj = {}
        obj[d.path] = d.message
        return obj;
      })
      return res.status(400).json({
        status: 'error',
        message: errorList
      });
    });

  }

  static login = async (req, res) => {
    const {
      email,
      password
    } = req.body;

    await User.findOne({
      where: {
        email
      }
    }).then(async result => {
      //return console.log(result);
      if (result === null) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found'
        })
      } else {
        const data = {
          id: result.id,
          email: result.email,
          password: result.password
        }

        await bcrypt.compare(password, result.password, async function (err, passed) {
          if (passed) {
            let token = await jwt.sign(data, JWT_SECRET_KEY, {
              expiresIn: '1h'
            });
            return res.status(200).json({
              token
            })
          } else {
            return res.status(401).json({
              status: 'error',
              message: 'password is wrong'
            });
          }
        })
      }
    }).catch(error => {
      return res.status(400).json({
        status: 'error',
        message: error.message
      })
    })
  }

  static update = async (req, res) => {
    const {
      full_name,
      email
    } = req.body;
    const id = req.params.id;

    await User.findOne({
      where: {
        id: id
      }
    }).then(async result => {
      if (result === null) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found'
        })
      } else {
        await User.update({
          full_name,
          email
        }, {
          where: {
            id: id
          }
        }).then(async rslt => {
          await User.findOne({
            where: {
              id: id
            },
            attributes: ['id', 'full_name', 'email', 'createdAt', 'updatedAt']
          }).then(rst => {
            return res.status(200).json({
              user: rst
            })
          }).catch(err => {
            return res.status(400).json({
              message: err.message
            })
          })

        }).catch(error => {
          const err = error.errors
          const errorList = err.map(d => {
            let obj = {}
            obj[d.path] = d.message
            return obj;
          })
          return res.status(400).json({
            status: 'error',
            message: errorList
          });
        })
      }

    })
  }

  static delete = async (req, res) => {
    const id = req.params.id;

    await User.findOne({
      where: {
        id
      }
    }).then(async rsl => {
      //return res.json(rsl)
      if (rsl === null) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found'
        })
      } else {
        await User.destroy({
          where: {
            id
          }
        }).then(result => {
          res.status(200).json({
            message: 'Your account has been successfully deleted'
          })
        }).catch(error => {
          const err = error.errors
          const errorList = err.map(d => {
            let obj = {}
            obj[d.path] = d.message
            return obj;
          })
          return res.status(400).json({
            status: 'error',
            message: errorList
          });
        })
      }
    })

  }

  // static topup = async (req, res) => {
  //   const {
  //     balance
  //   } = req.body;

  //   await User.update({
  //     where : {
  //       balance
  //     }
  //   })
  // }

}

module.exports = userController;