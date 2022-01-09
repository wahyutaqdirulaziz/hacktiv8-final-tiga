const {
  Product
} = require('../models');

class productController {
  static create = async (req, res) => {
    const {
      title,
      stock,
      price,
      categoryId
    } = req.body;

    await Product.create({
      title,
      stock,
      price,
      categoryId
    }).then(result => {
      return res.status(201).json({
        product: result
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