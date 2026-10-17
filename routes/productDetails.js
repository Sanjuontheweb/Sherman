import { products } from "../server/productData.js"
import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
  res.render('details-landing')
})

router.get('/:id', (req, res) => {
    const productId = req.params.id
    const product = products.find(product => product.id === productId)
    
    if (product) {
      res.render('products', {product})
    } else {
      res.render('404');
    }
})

export default router