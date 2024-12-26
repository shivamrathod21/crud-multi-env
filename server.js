const express = require('express');
const sequelize = require('./config/database');
const Item = require('./models/item')(sequelize);
const app = express();

app.use(express.json());

// Welcome page
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the CRUD API',
        endpoints: {
            getAllItems: 'GET /api/items',
            getOneItem: 'GET /api/items/:id',
            createItem: 'POST /api/items',
            updateItem: 'PUT /api/items/:id',
            deleteItem: 'DELETE /api/items/:id'
        }
    });
});

// Routes
app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.findAll();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/items', async (req, res) => {
    try {
        const item = await Item.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/items/:id', async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/items/:id', async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (item) {
            await item.update(req.body);
            res.json(item);
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/items/:id', async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (item) {
            await item.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Sync database and start server
const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.sync();
        console.log('Database synced');
        
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        return server;
    } catch (error) {
        console.error('Unable to start server:', error);
        process.exit(1);
    }
}

// Only start the server if we're not in a test environment
if (process.env.NODE_ENV !== 'test') {
    startServer();
}

module.exports = { app, sequelize, startServer };
