const {Product} = require('../models');
const rupiah    = require('../utils/formatMoney');

class productController {
  static create = async (req, res) => {
    const {
      title,
      stock,
      price,
      categoryId
    } = req.body;
    const {role} = req.user;
    //return console.log(role);

    if (role !== 'admin') {
      return res.status(403).json({
        status: 'Forbidden',
        message: 'User unauthorized'
      })
    } else {
      await Product.create({
        title,
        stock,
        price,
        categoryId
      }).then(result => {
        let data = {
          id        : result.id,
          title     : result.title,
          price     : rupiah(result.price),
          stock     : result.stock,
          categoryId: result.categoryId,
          updatedAt : result.updatedAt,
          createdAt : result.createdAt
        }
        return res.status(201).json({
          product: data
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

  static getAll = async (req, res) => {
    let data = await Product.findAll()
    data.forEach((data) => {
     data.price = rupiah(data.price)
    })
    .then(result => {
      return res.status(200).json({
        product: result
      })
    })
    .catch(error => {
      return res.status(400).json({
        status: 'error',
        message: error.stack
      })
    })
  }

}

module.exports = productController;