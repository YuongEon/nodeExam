import Product from '../modules/product.js';
import joi from 'joi';

const productSchema = joi.object({
  name: joi.string().required(),
  price: joi.number().required()
})

export const create = async(req, res) => {
  try {
    const {error} = productSchema.validate(req.body);
    if(error){
      return res.status(400).json({
        message: 'check your value and value type'
      })
    }
    const product = await Product.create(req.body)
    if(!product){
      res.status(400).json({
        message: 'cancel create'
      })
    } else {
      res.status(201).json({
        message: 'create success',
        data: product
      })
    }
  } catch (error) {
    res.status(400).json({
      message: error
    })
  }
}

export const getAll = async(req, res) => {
  try {
    const product = await Product.find();
    if(product.length === 0){
      res.status(200).json({
        message: 'no product here'
      })
    } else {
      res.status(200).json({
        message: 'fetch data success',
        data: product
      })
    }
  } catch (error) {
    res.status(400).json({
      message: error
    })
  }
}

export const getOne = async(req, res) => {
  try {
    const product = await Product.findById(req.params.id).exec();
    if(!product){
      res.status(404).json({
        message: 'product do not exit'
      })
    } else {
      res.status(200).json({
        message: 'fetch data success',
        data: product
      })
    }
  } catch (error) {
    res.status(400).json({
      message: error
    })
  }
}

export const updatePr = async(req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      price: req.body.price
    }
    await Product.updateOne({...updateData})
      .then((product) => {
        res.status(200).json({
          message: 'update success',
          data: updateData
        })
      })
      .catch((err) => {
        res.status(400).json({
          message: 'update failed',
        })
      })
  } catch (error) {
    res.status(400).json({
      message: error
    })
  }
}

export const deletePr = async(req, res) => {
  try {
    await Product.findOneAndDelete({_id: req.params.id})
      .then((productDeleted) => {
        res.status(200).json({
          message: 'delete success',
          data: productDeleted
        })
      })
      .catch((err) => {
        res.status(400).json({
          message: 'delete failed',
        })
      })
  } catch (error) {
    res.status(400).json({
      message: error
    })
  }
}
