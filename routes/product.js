const express = require("express")
const router = express.Router()
const products = require("./data/productsJson")

router.get('/products', (req, res) => {
    res.status(200).json(products)
})

router.post('/products', (req, res) => {
    const newProduct = req.body
    res.status(201).json(newProduct)
})

router.get('/product/:id', (req, res) => {
    const productId = req.params.id
    const product = products.find(product => product.id === productId)

    if (product) {
        res.status(200).json(product)
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
})

module.exports = router