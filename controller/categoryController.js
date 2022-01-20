const {
    Category
  } = require('../models');

class categoryController{
    // read category
    static index = async(req,res)=>{
        await Category.findAll({
        })
        .then(Category => res.status(200).send(Category))
        .catch(error => res.status(400).send(error));
    }

    // create category 
    static create = async(req,res)=>{
        const {
            type,
            sold_product_amount,
          } = req.body;
          if (req.user.role !== 'admin') { res.status(401).json({ status: 'Unauthorize', message: "User Unauthorized" }) }
          else {

            await Category.create({
                type : type,
                sold_product_amount :sold_product_amount
                      }).then(Category => res.status(201).send(Category)).catch(err => {
                     const errors = err.errors
                     const errorList = errors.map(e => {
                     let obj = {}
                     obj[e.path] = e.message
                     return obj;
                 })
                 return res.status(400).json({
                     success: false,
                     msg: errorList
                 })
             })
          }
         
    }


    static update = async (req, res) => {
        const id = req.params.id;
        const {
            type,
            sold_product_amount,
          } = req.body;
          
    
        //return console.log(req.user.role);
        if (req.user.role !== 'admin') { res.status(401).json({ status: 'Unauthorize', message: "User Unauthorized" }) }
        else {
          await Category
          .findOne({
              where: { id: id }
          })
          .then(category => {
              if (!category) {
                  return res.status(404).send({
                      message: 'Category Not Found',
                  });
              }
              return Category
                  .update({
                    type : type,
                    sold_product_amount :sold_product_amount
                  })
                  .then(() => res.status(200).send(Category)) // Send back the updated photo.
                  .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
        }
      }

    static destroy = async(req,res)=>{
        Category
            .findOne({
                where: { id: req.params.id }
            })
            .then(category => {
                if (!category) {
                    return res.status(400).send({
                        message: 'category Not Found',
                    });
                }
                return Category
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
}
module.exports = categoryController;