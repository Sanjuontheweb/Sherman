import fs from 'fs';
import path from 'path';
import multer from 'multer'; 
import express from 'express';
import { fileURLToPath } from 'url';

import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, 'users.json');
const productsFilePath = path.join(__dirname, 'products.json');

if (!fs.existsSync(usersFilePath)) {
    const initialAdmin = [{
        uid: "TDYecqVADbhEJkasaDJ1cFEEVrG3",
        username: "admin",
        email: "admin@gmail.com",
        role: "admin"
    }];
    fs.writeFileSync(usersFilePath, JSON.stringify(initialAdmin, null, 4));
}

const router = express.Router();

router.use(express.json());

const distPath = path.join(__dirname, 'dist');
router.use(express.static(distPath));
router.use('/seller/dashboard', express.static(distPath));
router.use('/seller/sellProduct', express.static(distPath));

router.get('/api/config', (req, res) => {
    res.json({
        apiKey: process.env.FIRE_APIKEY,
        authDomain: process.env.FIRE_AUTHDOMAIN,
        projectId: process.env.FIRE_PROJID,
        storageBucket: process.env.FIRE_STORAGEBUCKET,
        messagingSenderId: process.env.FIRE_SENDERID,
        appId: process.env.FIRE_APPID,
    });
});

router.post('/api/users', (req, res) => {
    const { uid, username, email, role } = req.body;
    let users = JSON.parse(fs.readFileSync(usersFilePath));
    
    if (!users.find(u => u.email === email)) {
        users.push({ uid, username, email, role });
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 4));
    }

    res.json({ success: true });
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '..', '..', 'public/images/products/');

        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/api/products/create', upload.single('productImage'), (req, res) => {
    const savedImagePath = `/images/products/${req.file.filename}`;
    let prods;

    const newProduct = {
        id: req.body.id,
        image: savedImagePath,
        name: req.body.name,
        rating: JSON.parse(req.body.rating),
        price: Number(req.body.price),
        description: req.body.description,
        keywords: JSON.parse(req.body.keywords),
        seller: req.body.seller,
        sellerId: req.body.sellerId,
    };

    try {
        if (fs.existsSync(productsFilePath)) {
            const fileData = fs.readFileSync(productsFilePath, 'utf-8');
            prods = JSON.parse(fileData || '[]'); 
        } else {
            fs.writeFileSync(productsFilePath, JSON.stringify([]));
        }
    } catch (err) {
        console.error("Error reading products.json:", err);
        return res.status(500).json({ error: "Failed to read database." });
    }
    
    if (!prods.find(u => u.id === newProduct.id)) {
        prods.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(prods, null, 2));
    }

    res.json({ success: true });
    
})

router.get('/api/users/:email', (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFilePath));
    const user = users.find(u => u.email === req.params.email);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

router.get('/api/products/:id', (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath));
    const product = products.find(u => u.id === req.params.id);
    if (products) {
        res.json(product);
    } else {
        res.status(404).json({ error: "product not found" });
    }
});

router.get('/api/products', (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath));

    try {
    if (products) {
        res.json(products);
    } else {
        res.status(404).json({ error: "no products" });
    }
    } catch (err) {
        console.error(err)
    }
});

router.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

export default router;