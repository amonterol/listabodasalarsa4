const passport = require('passport');
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

passport.use(Usuario.createStrategy());

passport.serializeUser(Usuario.serializeUser());
passport.deserializeUser(Usuario.deserializeUser());

