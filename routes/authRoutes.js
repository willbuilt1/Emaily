const passport = require('passport');

module.exports = (app) => {
    //initial authentication attempt. Scope being what is requested
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email'],
        })
    );

    //when it comes back authenticate again this time with code present. This then runs callback from strategy
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
