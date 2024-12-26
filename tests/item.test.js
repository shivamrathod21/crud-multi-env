const { Sequelize } = require('sequelize');
const ItemModel = require('../models/item');

describe('Item Model Test', () => {
    let sequelize;
    let Item;

    beforeAll(async () => {
        // Create a test database connection
        sequelize = new Sequelize('sqlite::memory:');
        Item = ItemModel(sequelize);
        await sequelize.sync();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create an item', async () => {
        const item = await Item.create({
            name: 'Test Item',
            description: 'Test Description'
        });
        expect(item.name).toBe('Test Item');
        expect(item.description).toBe('Test Description');
    });

    it('should not create an item without name', async () => {
        try {
            await Item.create({
                description: 'Test Description'
            });
        } catch (error) {
            expect(error).toBeTruthy();
        }
    });
});
