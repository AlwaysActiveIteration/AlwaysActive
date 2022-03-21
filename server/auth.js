const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: ,
  clientSecret: ,
  callbackURL: 'http://localhost/3000/google/auth',
  passReqToCallback: true,
},
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
))


module.exports = passport;