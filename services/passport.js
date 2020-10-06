const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

//tells passport that we are using cookies

passport.serializeUser((user, done) => {
    //using internal mongoDB id
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // retrieve ID a
    User.findById(id).then((user) => {
        done(null, user);
    });
});

//speecific strategy being used with credentials form access
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            //used to trust proxy which is used in Heroku instance
            proxy: true,
        },
        //gets called when information comes back from Google
        async (accessToken, refreshToken, profile, done) => {
            //returns a promise, existingUser object
            const existingUser = await User.findOne({ googleID: profile.id });
            //returns null if user does not exist
            if (existingUser) {
                // user exists
                // arg1 = no issue, arg2 = the user returned
                done(null, existingUser);
            } else {
                //user doesn't exist create a user
                const user = await new User({ googleID: profile.id }).save();
                done(null, user);
                //generally use second model instance as this may have extra info, save() returns a promise
            }
        }
    )
);
