const passport = require('passport');

module.exports = app =>{
    //initial authentication attempt. Scope being what is requested 
app.get('/auth/google', passport.authenticate('google', {
    scope:['profile', 'email']
}));

//when it comes back authenticate again this time with code present. This then runs callback from strategy
app.get('/auth/google/callback', passport.authenticate('google'));
}