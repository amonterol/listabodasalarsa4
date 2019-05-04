var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require( 'mongoose-mongodb-errors' );
const passportLocalMongoose = require('passport-local-mongoose');


//var bcrypt = require('bcrypt-nodejs');

var usuarioSchema = mongoose.Schema({

  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalidad Email Address'],
    required: 'Please Supply an email address'
  },
  nombre: {
    type: String,
    trim: true,
    required: 'Please Supply a name'
  }
});

usuarioSchema.plugin(passportLocalMongoose, {usernameField: 'email'});
usuarioSchema.plugin(mongodbErrorHandler,);
/*
  userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
  };

  userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
*/
module.exports = mongoose.model('Usuario', usuarioSchema);