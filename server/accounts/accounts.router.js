import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, 'users.json');

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

// 1: Add a new user to users.json upon registration
router.post('/api/users', (req, res) => {
    const { uid, username, email, role } = req.body;
    let users = JSON.parse(fs.readFileSync(usersFilePath));
    
    // Prevent duplicate entries
    if (!users.find(u => u.email === email)) {
        users.push({ uid, username, email, role });
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 4));
    }
    res.json({ success: true });
});

// API 2: Get user role for login routing
router.get('/api/users/:email', (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFilePath));
    const user = users.find(u => u.email === req.params.email);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

router.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

export default router;