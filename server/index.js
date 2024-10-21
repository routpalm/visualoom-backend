const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './config/config.env' });

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); // Middleware to parse JSON requests

// Connect to the database
const sequelize = new Sequelize(process.env.DB_DEV_NAME, process.env.DB_DEV_USERNAME, process.env.DB_DEV_PASSWORD, {
    host: process.env.DB_DEV_HOST,
    dialect: 'postgres',
    port: Number(process.env.DB_DEV_PORT)
});

const HelloWorld = require('./models/HelloWorld')(sequelize);

// Test connection
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Unable to connect to the database:', err));

sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Unable to sync database:', err));

app.get('/', (req, res) => res.send('API Running'));

app.post('/helloworld', async (req, res) => {
    try {
        // Create the HelloWorld object and save it to the database
        const hello = await HelloWorld.create({ message: 'Hello World!' });
        res.status(201).json(hello); // Respond with the created object
    } catch (error) {
        console.error('Error creating HelloWorld object:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to fetch and deliver the "Hello World!" message
app.get('/helloworld', async (req, res) => {
    try {
        // Find the first HelloWorld message in the database
        const hello = await HelloWorld.findOne();
        console.log('Query result:', hello); // Add this line to log the actual result
        if (hello) {
            res.status(200).json({ message: hello.message });
        } else {
            res.status(404).json({ message: 'No HelloWorld message found' });
        }
    } catch (error) {
        console.error('Error fetching HelloWorld object:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = sequelize; // Export the Sequelize instance