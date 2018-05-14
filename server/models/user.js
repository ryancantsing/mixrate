var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('mongoose-type-email');
var UserSchema = new mongoose.Schema ({
    first_name: {
        type: String,
        required: [true, "We're gonna need that first name, pal"],
        minlength: [2, "Your first name must be at least 2 characters"],
    },
    last_name: {
        type: String,
        required: [true, "We're gonna need that last name, slick"],
        minlength: [2, "Your first name must be at least 2 characters"],
    },
    username: {
        type: String,
        required: [true, "Your username is very important"],
        minlength: [5, "A minimum length of 5 characters for your username is required"],
        unique: [true, "This username has already been taken."]
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: [true, "We need an email for your account"],
        unique: [true, "This email has already been taken."]
    },
    password: {
        type: String,
        required: [true, "We need a password for your account" ],
        minlength: [8, "A password of at least 8 characters is required."],
    },
    total_likes: {type: Number},
    
})
// module.exports.generateJwt =  function (){
//     var expiry = new Date();
//     expiry.setDate(expiry.getDate() + 7);
    
//     return jwt.sign({
//         _id: this._id,
//         email: this.email,
//         username: this.username,
//         first_name: this.first_name,
//         last_name: this.last_name,
//         total_likes: this.total_likes,
//         exp: parseInt(expiry.getTime() / 1000)
//     }, "MY_SECRET");
// }

UserSchema.plugin(uniqueValidator);
UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}
UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
}
const User = module.exports = mongoose.model('User', UserSchema)
// module.exports.getUserByUsername = function(username, callback){
//     const query = {username: username}
//     console.log(query)
//     User.findOne(query, callback);
// }
// module.exports.comparePassword = function(candidatepassword, hash, callback){
//     bcrypt.compare(candidatepassword, hash, (err, isMatch) => {
//         if(err) throw err;
//         callback(null, isMatch);
//     });
// }


