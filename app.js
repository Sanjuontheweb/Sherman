const express = require("express")
const app = express()
const path = require("path")
let { products } = require("./public/javascripts/products")

app.set("view engine", 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req, res) => {
    res.render('sherman')
})
app.get('/sherman', (req, res) => {
    res.redirect('/')
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

app.get('/api/products', (req, res) => {
    res.status(200).json({ products })
})

app.listen(4231)

// make a api route projucts which returns products json
// make the ui stylish
// create users, and auth route with jwt
// try orders now
// role based access