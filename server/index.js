const express = require('express');

// Init and import Sequelize instance
const { sequelize } = require('./models');

// Import routes
const baseRoutes = require('./routes/baseRoutes');
const helloWorldRoutes = require('./routes/helloWorldRoutes');
const apiRoutes = require('./routes/apiRoutes');

// Init Express
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON
app.use(express.json());

// Use the routes
app.use('/', baseRoutes);
app.use('/helloworld', helloWorldRoutes);
app.use('/api', apiRoutes);

// Test connection to database
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Unable to connect to the database:', err));

// Sync database  (use force=True to reset, DATA WILL BE LOST)
sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Unable to sync database:', err));

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
