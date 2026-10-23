import fs from 'fs';
import path from 'path';
import express from "express";
import { fileURLToPath } from 'url';
import { products, Product } from "../server/productData.js"

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsFilePath = path.join(__dirname, '..', 'server/accounts', 'products.json');

router.get('/', (req, res) => {
  res.render('details-landing')
})

router.get('/:id', (req, res) => {
    const productId = req.params.id
    const prods = JSON.parse(fs.readFileSync(productsFilePath));
    const allProducts = [
      ...products,
      ...prods.filter(
        newProduct =>
          !products.some(oldProduct => oldProduct.id === newProduct.id)
      )
    ];

    const productData = allProducts.find(
      product => product.id === productId
    );

    if (productData) {
      const product = new Product(productData);

      return res.render('products', { product });
    }

    return res.status(404).render('404');
})

export default router