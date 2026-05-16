import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'public', 'data.json');

const getData = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
const saveData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// GET DATA
app.get('/api/get_data.php', (req, res) => {
    const { type } = req.query;
    try {
        const data = getData();
        res.json(data[type] || { error: 'Invalid type' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// SAVE DATA
app.post('/api/save_data.php', (req, res) => {
    const { type, action, data: itemData, id } = req.body;
    try {
        const data = getData();
        if (!data[type]) return res.json({ success: false, error: 'Invalid type' });

        if (action === 'add') {
            const newItem = { ...itemData, id: Date.now() };
            data[type].push(newItem);
        } else if (action === 'update') {
            const index = data[type].findIndex(item => item.id == itemData.id);
            if (index !== -1) data[type][index] = { ...data[type][index], ...itemData };
        } else if (action === 'delete') {
            data[type] = data[type].filter(item => item.id != id);
        }

        saveData(data);
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

// LOGIN
app.post('/api/login.php', (req, res) => {
    const { username, password } = req.body;
    try {
        const data = getData();
        if (data.admin.username === username && data.admin.password === password) {
            res.json({ success: true, user: { username: data.admin.username, email: data.admin.email } });
        } else {
            res.json({ success: false, error: 'Invalid credentials' });
        }
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

app.listen(3001, () => {
    console.log('Backend simulated on port 3001');
});
