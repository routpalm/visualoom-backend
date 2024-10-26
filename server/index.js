const express = require('express');
const { sequelize } = require('./models'); // Import your Sequelize instance

// Import routes
const baseRoutes = require('./routes/baseRoutes');
const helloWorldRoutes = require('./routes/helloWorldRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
// const port = process.env.PORT || 3001;

app.use(express.json()); // Middleware to parse JSON

// Use the routes
app.use('/', baseRoutes);
app.use('/helloworld', helloWorldRoutes);


// Test connection to database
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Unable to connect to the database:', err));

// Sync database
sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Unable to sync database:', err));

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
