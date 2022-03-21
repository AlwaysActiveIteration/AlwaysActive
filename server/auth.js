const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: '339239996763-hag4c6dbfofl9io11oa5kq30bhj78f0p.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost/3000/google/auth',
  passReqToCallback: true,
},
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
))


module.exports = passport;