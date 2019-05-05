
const passport = require('passport');
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

console.log('Entramos a passport.js');

//passport.use(new LocalStrategy(Usuario.authenticate()));
passport.use(Usuario.createStrategy());

passport.serializeUser(Usuario.serializeUser());
passport.deserializeUser(Usuario.deserializeUser());




 