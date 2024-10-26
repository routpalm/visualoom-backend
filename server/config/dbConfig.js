// ./server/config/dbConfig.js

require('dotenv').config({ path: './config/config.env' });


const dbConfig = () => {
    if (process.env.NODE_ENV === 'development') {
        return {
            dialect: 'postgres',
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
        };
    } else {
        return {
            url: process.env.DATABASE_URL,
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
        };
    }
};

module.exports = dbConfig;
