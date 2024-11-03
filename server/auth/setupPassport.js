// ./server/config/setupPassport.js

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { googleStrategyConfig, googleAuthStrategy } = require('./passportConfig')


function setupPassport(app) {
    passport.use(new GoogleStrategy(googleStrategyConfig(), googleAuthStrategy));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });

    app.use(passport.initialize());
    app.use(passport.session());
}


module.exports = setupPassport;
