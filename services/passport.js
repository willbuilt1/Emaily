const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

//speecific strategy being used with credentials form access
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
},
(accessToken, refreshToken, profile )=> {
    console.log(accessToken);
    console.log(refreshToken);
    console.log('profile:', profile);
}));