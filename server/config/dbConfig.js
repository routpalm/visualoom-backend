// ./server/config/dbConfig.js


// This file is used by setSequelize to connect to the correct
// database. If the NODE_ENV environment variable is set to
// 'production', it will connect to the live production data-
// base. Otherwise, it will attempt to connect to a locally
// hosted database configured according to README.md. Different
// connection options are needed since the prouction database
// requires SSL, while the local database does not support it.


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
