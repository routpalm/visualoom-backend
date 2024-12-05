// ./server/controllers/adminController.js

const sequelize = require('../config/setupSequelize');


// resets the db. Only active in development environment
exports.resetdb = (req, res) => {
    console.log('Admin/reset route accessed');

    sequelize.sync({ force: true })
        .then(() => {
            console.log('Database reset');
            // Send 200 response on success
            res.status(200).json({ message: "Database reset" });
        })
        .catch(err => {
            console.error('Unable to reset database:', err);
            // Send 500 response if an error occurs
            res.status(500).json({ error: 'Unable to reset database', details: err.message });
        });
};

