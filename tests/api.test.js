const request = require('supertest');
const express = require('express');
const { Sequelize } = require('sequelize');
const ItemModel = require('../models/item');

describe('API Tests', () => {
    let app;
    let sequelize;
    let Item;

    beforeAll(async () => {
        // Setup test database
        sequelize = new Sequelize('sqlite::memory:');
        Item = ItemModel(sequelize);
        await sequelize.sync();

        // Setup express app
        app = express();
        app.use(express.json());

        // Setup routes
        app.post('/api/items', async (req, res) => {
            try {
                const item = await Item.create(req.body);
                res.status(201).json(item);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        });

        app.get('/api/items', async (req, res) => {
            const items = await Item.findAll();
            res.json(items);
        });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a new item', async () => {
        const response = await request(app)
            .post('/api/items')
            .send({
                name: 'Test Item',
                description: 'Test Description'
            });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Test Item');
    });

    it('should get all items', async () => {
        const response = await request(app)
            .get('/api/items');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
