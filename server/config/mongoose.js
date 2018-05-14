var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
//link your database down here!
module.exports = {
  secret: 'yoursecret'
}
mongoose.connect('mongodb://localhost/mixrate');
mongoose.connection.on('connected', () => {
  console.log("connected to the Database ")
})
var models_path = path.join(__dirname, './../models');
mongoose.Promise = global.Promise;

fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {
    require(models_path + '/' + file);
  }
});