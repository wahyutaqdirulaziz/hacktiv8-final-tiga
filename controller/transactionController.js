const { Transaction, User, Product, Category } = require('../models');
const rupiah = require('../utils/formatMoney');

class transactionController {
  static create = async (req, res) => {
    const { productId, quantity } = req.body;
    const { id } = req.user;
    //return console.log(id);

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
            id
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
                  id
                }
              })

              await Category.findOne({
                where: {
                  id: rsl.categoryId
                }
              }).then(async (dt) => {
                await Category.update({
                  sold_product_amount: dt.sold_product_amount + quantity
                }, {
                  where: {
                    id: dt
                  }
                }).then(lsp => {
                  console.log(lsp)
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