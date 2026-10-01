const express = require("express")
const app = express()
const path = require("path")
const productRouter = require("./routes/product")
const products = require("./routes/data/productsJson")

app.set("view engine", 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))


app.get('/', (req, res) => {
    res.render('sherman_m')
})
app.get('/sherman', (req, res) => {
    res.redirect('/')
})

app.get('/details/:id', (req, res) => {
    const productId = req.params.id
    const product = products.find(product => product.id === productId)

    if (product) {
        res.render('products')
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
})

app.get('/orders', (req, res) => {
    res.render(('orders'))
})

app.get('/tracking', (req, res) => {
    res.render(('tracking'))
})

app.get('/checkout', (req, res) => {
    res.render(('checkout'))
})

//api routes
app.use('/api', productRouter)

app.listen(5173)

// make the ui stylish
// create users, and auth route with jwt
// try orders now
// role based access
// product page