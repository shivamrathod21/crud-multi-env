const { Sequelize } = require('sequelize');

const createSequelize = () => {
    if (process.env.NODE_ENV === 'test') {
        return new Sequelize('sqlite::memory:', {
            logging: false
        });
    }

    return new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: console.log
    });
};

module.exports = createSequelize;
