// ./server/config/sessionConfig.js


const sessionConfig = () => {
    return {
        secret: 'test_key_do_not_use_in_production',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false
        }
    };
};

module.exports = sessionConfig;