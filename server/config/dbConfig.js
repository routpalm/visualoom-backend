// ./server/config/dbConfig.js

require('dotenv').config({ path: './config/config.env' });


// Generates config dynamically based on environment
//   - PROD: heroku requires SSL
//   - DEV : local postgres does not support SSL
const dbConfig = () => {
    const isProduction = process.env.NODE_ENV === 'production';

    return {
        dialect: 'postgres',
        protocol: 'postgres',
        url: process.env.DATABASE_URL,
        dialectOptions: {
            ssl: isProduction ? { rejectUnauthorized: false } : false // Enable SSL for production
        }
    };
};

module.exports = dbConfig;
