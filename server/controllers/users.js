var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken')

module.exports = {
    show: function(req, res){
        console.log("checkpoint USER test controller")
        var user = User.find({}, (err, user) => {
            console.log(user)
            if(err){
                res.json({ message: "User not found"})
            }else {
                res.json({ message: "There he is!", user})
            }
        })
    },
    view: function(req, res){
        console.log("checkpoint DASHBOARD controller")
        var user = User.findById({_id : req.params.id}, (err, user) => {
            console.log(User)
            if(err){
                res.json({ message: "User Not found, please register", err})
            } else {
                res.json({ message: "Found user!", user})
            }
        })
    },
    create: function(req, res){
        console.log("checkpoint user CREATE controller")
        var user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            total_likes: 0    
        })
    
        user.save((err, user) => {
            if(err){
                res.json({ message: "Couldn't create user", err})
            } else {
            var token;
            var expiry = new Date();
            expiry.setDate(expiry.getDate() + 7);
            jwt.sign({
                _id: user._id,
                email: user.email,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                total_likes: user.total_likes,
                exp: parseInt(expiry.getTime() / 1000)
            }, "MY_SECRET");
            res.status(200);
            res.json({
                "token": token,
                message: "User created!", user
                })
            };
     });
    },
    login: function(req, res){
        console.log("checkpoint user LOGIN controller");
        passport.authenticate('local', function(err, user, info){
            var token;
            if(err) {
                res.status(404).json(err);
                return;
            }
            if(user){
                token = user.generateJwt();
                res.status(200);
                res.json({
                    "token": token
                });
            } else {
                res.status(401).json(info);
            }
        })(req, res);
    },
    profileRead: function(req, res){
        if(!req.payload._id){
            res.status(401).json({
                "message": "UnauthorizedError: not Logged in!"
            });
        } else {
            User.findById(req.payload._id).exec(function (err, user){
                res.status(200).json(user);
            });
        }
    },
    update: function(req, res){
        console.log("Checkpoint Update User controller");
        var user = User.findById({_id: req.params.id})
            user.update({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            },
            (err, user) => {
                if(err){
                    res.json({message: "Update did not work", err})
                }else {
                    res.json({message: "User successfully updated!"})
                }
            })
    },
    delete: function(req, res){
        console.log("Checkpoint Delete user controller")
        var user = User.findById({_id : req.params.id}, (err) => {
            user.remove((err) => {
                if(err){
                    res.json({message: "You'll never leave haha jk something went wrong on delete"})
                }else{
                    res.json({ message: "Later hater!"})
                }
            })
        })
    }

}