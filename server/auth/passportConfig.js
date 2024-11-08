// ./server/config/passportConfig.js

const { User } = require('../models'); // Import from index.js instead

const googleStrategyConfig = () => {
  return {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  };
};

async function googleAuthStrategy(accessToken, refreshToken, profile, done) {

  try {
    const user = await User.findOne({ where: { googleId: profile.id } });
    if (user) {
      return done(null, user);
    }
    const newUser = await User.create({
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
    });
    done(null, newUser);
  } catch (err) {
    done(err);
  }
}


module.exports = { googleStrategyConfig, googleAuthStrategy };
