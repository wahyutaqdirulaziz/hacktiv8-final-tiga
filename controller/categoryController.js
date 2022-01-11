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


    static edit = async(req,res)=>{
        
    }

    static update = async(req,res)=>{
        
    }

    static delete = async(req,res)=>{
        
    }
}
module.exports = categoryController;