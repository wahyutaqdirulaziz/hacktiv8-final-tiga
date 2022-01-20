const { Category, Product } = require('../models');

class categoryController {
    static create(req, res) {
        const { type } = req.body;
        const { role } = req.user;

        if (role !== 'admin') {
            return res.status(401).json({
                status: "error",
                message: "user unauthorized"
            })
        } else {
            Category.create({
                type
            }).then(rsl => {
                return res.status(201).json({
                    id: rsl.id,
                    type: rsl.type,
                    updatedAt: rsl.updatedAt,
                    createdAt: rsl.createdAt,
                    sold_product_amount: rsl.sold_product_amount
                })
            }).catch(error => {
                const err = error.errors
                const errorList = err.map(d => {
                    let obj = {}
                    obj[d.path] = d.message
                    return obj;
                })

                return res.status(400).json({
                    status: 'Data Error',
                    message: errorList
                });
            })
        }
    }

    static show(req, res) {
        Category.findAll({
            include: [
                {
                    model: Product,
                    attributes: ['id', 'title', 'price', 'stock', 'categoryId', 'createdAt', 'updatedAt']
                }
            ]
        })
            .then(rsl => {
                return res.status(200).json({
                    categories: rsl
                })
            })
            .catch(err => {
                return res.status(400).json({
                    message: err.message
                })
            })
    }

    static patch(req, res) {
        const { type } = req.body;
        const id = req.params.id;
        const { role } = req.user;

        if (role !== 'admin') {
            return res.status(401).json({
                status: "error",
                message: "user unauthorized"
            })
        } else {
            Category.update({
                type
            }, {
                where: {
                    id
                }
            }).then(async () => {
                await Category.findOne({
                    where: {
                        id: id
                    },
                    attributes: ['id', 'type', 'sold_product_amount', 'createdAt', 'updatedAt']
                }).then(rsl => {
                    return res.status(200).json({
                        category: rsl
                    })
                }).catch(err => {
                    return res.status(400).json({
                        message: err.message
                    })
                })
            }).catch(error => {
                return res.status(400).json({
                    status: 'error',
                    message: error.message
                });
            })
        }

    }

    static delete(req, res) {
        const id = req.params.id;
        const { role } = req.user;

        Category.findOne({
            where: {
                id: id
            }
        }).then(async (data) => {
            if (data === null) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Category not found'
                })
            }
            if (role !== 'admin') {
                return res.status(401).json({
                    status: "error",
                    message: "user unauthorized"
                })
            } else {
                Category.destroy({
                    where: {
                        id: id
                    }
                }).then(() => {
                    return res.status(200).json({
                        message: 'Category has been successfully deleted'
                    })
                }).catch((error) => {
                    return res.status(400).json({
                        status: 'error',
                        message: error.message
                    });
                })
            }

        }).catch((error) => {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        })

    }

}

module.exports = categoryController;