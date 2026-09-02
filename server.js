const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

if (!fs.existsSync(DB_FILE)) {
    const initialData = {
        users: [
            { username: '0_Artyr4ik_0', email: 'artyr4ik@creator.com', role: 'creator', status: 'Активен', pass: 'k9#mP!2$vX8L', lastActive: Date.now() },
            { username: 'Vortex_99', email: 'vortex@mail.com', role: 'user', status: 'Активен', pass: '123', lastActive: Date.now() },
            { username: 'xX_Skillet_Xx', email: 'skillet@mail.com', role: 'cobra', status: 'Активен', pass: '123', lastActive: Date.now() },
            { username: 'Bender_Rodr', email: 'bender@mail.com', role: 'moderator', status: 'Активен', pass: '123', lastActive: Date.now() },
            { username: 'Killa_Inst', email: 'killa@mail.com', role: 'admin', status: 'Активен', pass: '123', lastActive: Date.now() }
        ],
        posts: [
            { id: 1, title: 'Добро пожаловать в AIware Visuals v1.0', content: 'Добро пожаловать на официальный форум AIware!', category: 'news', author: '0_Artyr4ik_0' }
        ],
        chat: [
            { author: 'Vortex_99', text: 'Всем привет! Сервер запущен.' }
        ]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
}

function readDB() {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.get('/api/data', (req, res) => {
    res.json(readDB());
});

app.post('/api/save', (req, res) => {
    const { users, posts, chat } = req.body;
    const db = readDB();
    if (users) db.users = users;
    if (posts) db.posts = posts;
    if (chat) db.chat = chat;
    writeDB(db);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен! Открой в браузере: http://localhost:${PORT}/index.html`);
});
