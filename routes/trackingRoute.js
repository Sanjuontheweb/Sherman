import { products } from "../server/productData.js"
import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
  res.render('track-landing')
})

router.get('/order/', (req, res) => {
    const productId = req.query.productId
    const quantity = req.query.quantity
    const product = products.find(product => product.id === productId)
    
    if (product) {
      res.render('tracking', {product, quantity})
    } else {
      res.render('404');
    }
})

export default router