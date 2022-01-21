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
                  sold_product_amount: dt.sold_product_amount + quantity
                }, {
                  where: {
                    id: dt.id
                  }
                }).then(async (data) => {
                  let total_price = quantity * rsl.price;
                  let userid = id;
                  await Transactions.create({
                    productId: productId,
                    userId: id,
                    quantity,
                    total_price
                  }).then(result => {
                    return res.status(201).json({
                      message: "You have successfully purchase the product",
                      transactionBil: {
                        total_price: rupiah(total_price),
                        quantity: quantity,
                        product_name: rsl.title
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
                }).catch(error => {
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

  static getAll = async (req, res) => {
    const { id } = req.user;
    //return console.log(id);

    await Transactions.findAll({
      where: {
        userId: id
      },
      attributes: ['productId', 'userId', 'quantity', 'total_price', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Product,
          attributes: ['id', 'title', 'price', 'stock', 'categoryId']
        }
      ]
    }).then((result) => {
      result.map(dt => {
        dt.total_price = rupiah(dt.total_price)
        dt.Product.price = rupiah(dt.Product.price)
      })
      return res.status(200).json({
        transactionsHistories: result
      })
    })
  }

  static getAllAdmin = async (req, res) => {
    const {id}      = req.user;
    const { role }  = req.user;

    if (role !== 'admin') {
      return res.status(401).json({
        status: "error",
        message: "user unauthorized"
      })
    } else {
      await Transactions.findAll({
        where: {
          userId: id
        },
        attributes: ['productId', 'userId', 'quantity', 'total_price', 'createdAt', 'updatedAt'],
        include: [
          {
            model: Product,
            attributes: ['id', 'title', 'price', 'stock', 'categoryId']
          },
          {
            model: User,
            attributes: ['id', 'email', 'balance', 'gender', 'role']
          }
        ]
      }).then((result) => {
        result.map(dt => {
          dt.total_price = rupiah(dt.total_price)
          dt.Product.price = rupiah(dt.Product.price)
        })
        return res.status(200).json({
          transactionsHistories: result
        })
      })
    }
  }

  static getTransaction = async (req, res) => {
    const {transactionId}     = req.params;
    const {role, id}          = req.user;
    //return console.log(role);
    await Transactions.findOne({
      where: {
        id: transactionId, userId: id
      }, attributes: ['productId', 'userId', 'quantity', 'total_price', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Product,
          attributes: ['id', 'title', 'price', 'stock', 'categoryId']
        }
      ]
    }).then((result) => {
      //return console.log(result.userId);
      result.total_price = rupiah(result.total_price)
      result.Product.price = rupiah(result.Product.price)
      if (result === null) {
        return res.status(404).json({
          status: 'error',
          message: 'Transaction histories not found'
        })
      } else {
        return res.status(200).json({
          transactionsHistories: result
        })
      }
    }).catch((error) => {
      return res.status(500).json({ message: error.message})
    })
    
  }

}

module.exports = transactionController;