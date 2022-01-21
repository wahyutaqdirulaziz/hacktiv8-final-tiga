const { Transactions, User, Product, Category } = require('../models');
const rupiah = require('../utils/formatMoney');

class transactionController {
  static create = async (req, res) => {
    const { productId, quantity } = req.body;
    const { id } = req.user;
    // return console.log(id);

    await Product.findOne({
      where: {
        id: productId
      }
    }).then(async (rsl) => {
      //return console.log(rsl);
      if (rsl === null) {
        return res.status(404).json({
          message: 'Product not found'
        })
      } else if (rsl.stock < quantity) {
        return res.status(400).json({
          message: 'Quantity more than stock'
        })
      } else {
        await User.findOne({
          where: {
            id: id
          }
        }).then(async (data) => {
          if (data.balance < quantity * rsl.price) {
            return res.status(400).json({ message: 'Your money is not enough' })
          } else {
            await Product.update({
              stock: rsl.stock - quantity
            }, {
              where: { id: rsl.id }
            }).then(async () => {
              await Product.findOne({
                where: { id: productId }
              })
              await User.update({
                balance: data.balance - rsl.price,
              }, {
                where: {
                  id: id
                }
              })

              await Category.findOne({
                where: {
                  id: rsl.categoryId
                }
              }).then(async (dt) => {
                await Category.update({
                  sold_product_amount: dt.sold_product_amount + quantity * rsl.price
                }, {
                  where: {
                    id: dt.id
                  }
                }).then(async (data) => {
                 var total_price = quantity * rsl.price;
                 var userid=id;
                  await Transactions.create({
                    productId : productId,
                    userId : id,
                    quantity,
                    total_price
                  }).then(result => {
                    return res.status(201).json({
                      message: "you Have successfully purchase the product",
                      transactionBil : {
                        total_price : total_price,
                        quantity : quantity,
                        product : rsl.title                                                          
                      }
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
                }).catch(error =>{
                  res.json(error.message)
                })
              })

            })
          }
        })

      }
    }).catch((error) => {
      return res.status(500).json({
        message: error.message
      })
    })

  }

}

module.exports = transactionController;