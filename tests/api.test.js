const request = require('supertest');
const { app, sequelize } = require('../server');
const Item = require('../models/item')(sequelize);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

beforeEach(async () => {
  await Item.destroy({ where: {} });
});

describe('Item API', () => {
  test('POST /api/items - Create an item', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ name: 'Test Item', description: 'Test Description' });
    
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test Item');
    expect(res.body.description).toBe('Test Description');
  });

  test('GET /api/items - Get all items', async () => {
    await Item.create({ name: 'Test Item 1', description: 'Test Description 1' });
    await Item.create({ name: 'Test Item 2', description: 'Test Description 2' });

    const res = await request(app).get('/api/items');
    
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].name).toBe('Test Item 1');
    expect(res.body[1].name).toBe('Test Item 2');
  });

  test('GET /api/items/:id - Get a single item', async () => {
    const item = await Item.create({ name: 'Test Item', description: 'Test Description' });

    const res = await request(app).get(`/api/items/${item.id}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Test Item');
    expect(res.body.description).toBe('Test Description');
  });

  test('PUT /api/items/:id - Update an item', async () => {
    const item = await Item.create({ name: 'Test Item', description: 'Test Description' });

    const res = await request(app)
      .put(`/api/items/${item.id}`)
      .send({ name: 'Updated Item', description: 'Updated Description' });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Updated Item');
    expect(res.body.description).toBe('Updated Description');
  });

  test('DELETE /api/items/:id - Delete an item', async () => {
    const item = await Item.create({ name: 'Test Item', description: 'Test Description' });

    const res = await request(app).delete(`/api/items/${item.id}`);
    
    expect(res.statusCode).toBe(204);

    const deletedItem = await Item.findByPk(item.id);
    expect(deletedItem).toBeNull();
  });
});
