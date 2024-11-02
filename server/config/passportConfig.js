// passport required for authentication
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// require('dotenv').config();

// utilizes the Google cloud controller info to generate tokens
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  
// save profile.id, looking up the user, etc. here (database stuff)
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
