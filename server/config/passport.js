const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const mongoose = require('./mongoose');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = mongoose.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log("Payload Zone", jwt_payload)
        User.getUserById(jwt_payload._doc._id, (err, user )=> {
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user);
            }else{
                return done(null, false);
            }
        })
    }))

}

