const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

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

//base path
app.get('/', (req,res) =>{
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Looky here</h1>');
    res.end();
})

//initial authentication attempt. Scope being what is requested 
app.get('/auth/google', passport.authenticate('google', {
    scope:['profile', 'email']
}));

//when it comes back authenticate again this time with code present. This then runs callback from strategy
app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});