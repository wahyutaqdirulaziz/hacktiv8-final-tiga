const bcrypt  = require('bcrypt');
const { User }  = require('../models');
const jwt = require('jsonwebtoken');

class userController {
  static register = async (req, res) => {
    const {
      full_name, email, password, gender, role
    } = req.body;

    let newPassword = password;
    if (password !== undefined) {
      newPassword = await bcrypt.hash(password, 10);
    }

    await User.create({
      full_name, email, password: newPassword, gender, role: "customer"
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
        user : data
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
}

module.exports = userController;