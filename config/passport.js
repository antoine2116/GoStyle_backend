// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

var bcrypt = require('bcrypt-nodejs');

const db = require("../app/sequelize");

const Utilisateurs = db.utilisateur;
const Op = db.Sequelize.Op;

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        Utilisateurs.findOne({
            where: {
                'id': id
            }
        }).then(user => {
            if (user == null) {
                done(new Error('Wrong user id'));
            }
            done(null, user);
        })
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================

    passport.use(
        'local-signup',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
            // find a user whose username is the same as sended
            Utilisateurs.findOne({
                where: {
                    username: username
                }
            }).then(users => {
                    // User already exist
                    if (users != null) {
                        return done(null, false);
                    }
                    else {
                        // Create user
                        Utilisateurs.create({
                            username: username,
                            password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
                        }).then(user => {
                            return done(null, user);
                        })
                    }
                })
                .catch(err => {
                    if (err) {
                        return done(err);
                    }
                });
        })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
            Utilisateurs.findOne({
                where: {
                    username: username
                }
            }).then(user => {
                if (user == null) {
                    return done(null, false);
                }
                else {
                    if (!bcrypt.compareSync(password, user.password)) {
                        return done(null, false);
                    }

                    // If all is well
                    return done(null, user);
                }
            }).catch(err => {
                done(err);
            });
        })
    );
};
