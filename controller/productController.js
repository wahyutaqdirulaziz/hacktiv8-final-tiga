const {
  Product,
  Category
} = require('../models');
const rupiah = require('../utils/formatMoney');

class productController {
  static create = async (req, res) => {
    const {
      title,
      stock,
      price,
      categoryId
    } = req.body;
    const {
      role
    } = req.user;
    //return console.log(role);

    if (role !== 'admin') {
      return res.status(401).json({
        status: 'Unauthorize',
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
          id: result.id,
          title: result.title,
          price: rupiah(result.price),
          stock: result.stock,
          categoryId: result.categoryId,
          updatedAt: result.updatedAt,
          createdAt: result.createdAt
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
    try {
      let data = await Product.findAll()
      data.forEach((data) => {
        data.price = rupiah(data.price)
      })
      return res.status(200).json({
        products: data
      })
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: error.stack
      })
    }
  }

  static update = async (req, res) => {
    const id = req.params.id;
    const {
      title,
      price,
      stock
    } = req.body;

    //return console.log(req.user.role);
    if (req.user.role !== 'admin') { res.status(401).json({ status: 'Unauthorize', message: "User Unauthorized" }) }
    else {
      await Product.findOne({
        where: {
          id
        }
      }).then(async (result) => {
        //return console.log();
        if (result == null) {
          return res.status(404).json({
            status: 'error',
            message: 'Data not found'
          })
        } else {
          await Product.update({
            title,
            price,
            stock
          }, {
            where: {
              id
            }
          }).then(async () => {
            await Product.findOne({
              where: {
                id
              }
            }).then((rsl) => {
              return res.status(200).json({
                product: rsl
              })
            }).catch((err) => {
              return res.status(500).json({
                status: 'error',
                message: err.message
              })
            })
          })
        }
      }).catch(error => {
        return res.status(500).json({
          status: 'error',
          message: error.stack
        })
      })
    }
  }

  static patchProduct = async (req, res) => {

    const {
      id
    } = req.params;
    const categoryId = req.body.categoryId;
    try {
      const product = await Product.findOne({
        where: {
          id
        }
      });
      if (!product) res.status(404).json({
        status: "Error",
        message: "Data not foumd!"
      });
      const category = await Category.findOne({
        where: {
          id: categoryId
        }
      })
      if (!category) res.status(404).json({
        status: "Error",
        message: "Data not foumd!"
      });
      product.update({
        categoryId
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: error.stack
      })
    }
  }

  static destroy = async (req, res) => {
    try {
      if (req.user.role !== 'admin') res.status(401).json({ status: 'Unauthorize', message: "User Unauthorized" })
      const product = await Product.findOne({
        where: {
          id: req.params.id
        }
      });
      if (!product) res.status(404).json({
        status: "error",
        message: "Data not found!"
      });
      product.destroy().then((result) => { return res.status(200).json({ message: 'Product has been successfully deleted' }) });
    } catch (error) {
      console.error(error);
    }

  }
}

module.exports = productController;