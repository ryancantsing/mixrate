const mixes = require('../controllers/mixes.js');
const users = require('../controllers/users.js')
const mongoose = require('./mongoose');
const passport = require('./passport');
const User = require('../models/user')
const passporting = require('passport')
const path = require('path');
const jwt = require('jsonwebtoken');
module.exports = function(app) {
    app.post('/authenticate', (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;
        const query = {username: username}

        User.findOne(query, (err, user) => {
            console.log(user)
            if(!user){
                return res.json({ success: false, message: 'User not found'})
            }
            if(user.password == password){
                    const token = jwt.sign(user.toJSON(), mongoose.secret, {
                        expiresIn: 604800
                    });

                    res.json({
                        success: true,
                        token: 'JWT '+token,
                        user: {
                            id: user._id,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            username: user.username,
                            email: user.email,
                            total_likes: user.total_likes
                            
                        }
                    });
                } else {
                    return res.json({success: false, message: 'Password was not correct'});
                }
            })
        })
    app.get('/mixes/:id', (req, res) => {
        console.log("checkpoint Routes VIEW User")
        users.view(req, res)
    }),
    app.get('users/profile', passporting.authenticate('jwt',{session:false}), (req, res) => {
        console.log("Hey there")
    })
    app.post('/users/create', (req, res)=> {
        console.log("made it to routes CREATE User", req.body)
        users.create(req, res)
    })
    app.post('/users/login', (req, res) => {
        console.log("made it to routes LOGIN User", req.body)
        users.login(req, res)
    })
    app.post('/mixes/create', (req, res)=> {
        console.log("made it to routes CREATE User", req.body)
        mixes.create(req, res)
    })
    app.patch('/users/patch/:id', (req, res) => {
        console.log("made it to routes UPDATE user")
        users.update(req,res)
    })
    app.patch('/mixes/patch/:id', (req, res) => {
        console.log("checkpoint Routes addReview")
        console.log(req.body)
        mixes.addReview(req, res)
    })
    app.delete('/users/delete/:id', (req, res) => {
        console.log("DELETE users made it to routes")
        users.delete(req, res)
    })
    app.delete('/mixes/delete/:id', (req, res) => {
        console.log("DELETE mixes made it to routes")
        mixes.delete(req, res)
    })
    app.get('mixes/show', (req, res) => {
        console.log("made it to routes SHOW mixes")
        mixes.show(req, res)
    })
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./mixrateAngular/dist/index.html"))
    })}