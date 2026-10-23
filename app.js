import express from 'express'
import path from 'path'
import dotenv from 'dotenv';
import accountsRouter from "./server/accounts/accounts.router.js" 
import productRouter from "./routes/product.js"
import backendRouter from "./routes/database.js"
import trackingRouter from "./routes/trackingRoute.js"
import productDetailsRouter from "./routes/productDetails.js"
import { connectToMongoDB } from './server/mongodb/baseConnect.js';

dotenv.config({ quiet: true })
const port = process.env.PORT;

const app = express()

const __dirname = import.meta.dirname;

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

app.get('/checkout', (req, res) => {
    res.render(('checkout'))
})

app.get('/contacts', (req, res) => {
    res.render(('contacts'))
})

app.get('/about', (req, res) => {
    res.render(('about'))
})

app.get('/privacy', (req, res) => {
    res.render(('policy'))
})

app.get('/sizeChartLink', (req, res) => {
    res.render('chart')
})

app.get('/warranty', (req, res) => {
    res.sendFile(path.resolve('public/images/appliance-warranty.png'));
})

app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.resolve('public/images/sherman-logo-title.png'));
})

app.get('/404', (req, res) => {
    res.render('404')
})

// api routes
app.use('/api/data', productRouter)
app.use('/details', productDetailsRouter)
app.use('/tracking', trackingRouter)
app.use('/accounts', accountsRouter);

await connectToMongoDB()
app.use('/api/backend/orders', backendRouter)

//handle 404 errors
app.use(function(req, res, next) {
  res.status(404);

  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

app.listen(port)