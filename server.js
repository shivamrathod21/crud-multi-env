require('dotenv').config();
const express = require('express');
const createSequelize = require('./config/database');
const ItemModel = require('./models/item');

const app = express();
const sequelize = createSequelize();
const Item = ItemModel(sequelize);

app.use(express.json());

// Routes
app.post('/api/items', async (req, res) => {
    try {
        const item = await Item.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.findAll();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Sync database and start server
const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to start server:', error);
    }
};

if (require.main === module) {
    start();
}

module.exports = { app, sequelize, Item };
