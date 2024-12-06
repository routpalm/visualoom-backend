// ./server/config/dbConfig.js

// Author - Brett DeWitt
// Created - Saturday, November 9, 2024, 1:30:03 PM
// Provides configuration for connecting to the PostgreSQL database based on the environment (development, production, test)
// Dynamically adjusts the connection options for production, development, and test environments (e.g., SSL for production)


// ---------------------- Database Configuration ----------------------
/**
 * Generates the configuration object for Sequelize database connection based on the current environment.
 * - For production, SSL is enabled to meet Heroku's requirements.
 * - For development and test environments, SSL is disabled since local and test databases do not require SSL.
 */
const dbConfig = () => {

    return {
        dialect: 'postgres',
        protocol: 'postgres',
        url: process.env.DATABASE_URL,
        dialectOptions: {
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
        }
    };
};


// Export the database configuration
module.exports = dbConfig;
