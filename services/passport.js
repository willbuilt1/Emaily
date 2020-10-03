const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

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
        },
        //gets called when information comes back from Google
        (accessToken, refreshToken, profile, done) => {
            //returns a promise, existingUser object
            User.findOne({ googleID: profile.id }).then((existingUser) => {
                //returns null if user does not exist
                if (existingUser) {
                    // user exists
                    // arg = no issue, arg2 = the user returned
                    done(null, existingUser);
                } else {
                    //user doesn't exist create a user
                    new User({ googleID: profile.id })
                        .save()
                        .then((user) => done(null, user));
                    //generally use second model instance as this may have extra info, save() returns a promise
                }
            });
        }
    )
);
