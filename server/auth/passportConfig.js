// ./server/config/passportConfig.js

const GoogleStrategy = require('passport-google-oauth20').Strategy;


const googleStrategyConfig = () => {
  return {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  };
};

function googleAuthStrategy(accessToken, refreshToken, profile, done) {
  // Create new user?
  // save profile.id, looking up the user, etc. here (database stuff)
  return done(null, profile);
}


module.exports = { googleStrategyConfig, googleAuthStrategy }
