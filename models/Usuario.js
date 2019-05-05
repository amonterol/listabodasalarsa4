const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require( 'mongoose-mongodb-errors' ); 
const passportLocalMongoose = require('passport-local-mongoose');


//var bcrypt = require('bcrypt-nodejs');


const usuarioSchema = new Schema({

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
usuarioSchema.plugin(mongodbErrorHandler);


module.exports = mongoose.model('Usuario', usuarioSchema);
