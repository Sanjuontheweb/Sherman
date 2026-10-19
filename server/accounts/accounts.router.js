import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const distPath = path.join(__dirname, 'dist');

router.use(express.static(distPath));

router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

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

router.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

export default router;