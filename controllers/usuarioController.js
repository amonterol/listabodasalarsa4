/*
  Este archivo 
*/

const mongoose = require('mongoose');
const Usuario = require('../models/Usuario');

const promisify = require('es6-promisify');



exports.loginForm = (req, res, next) => {
    res.render('usuario/loginForm', { title: 'Login' });
};

exports.registerFormGet = (req, res, next) => {
    res.render('usuario/registerForm', { title: 'Register' });
};

exports.validateRegister = (req, res, next) => {
    console.log('Esta validando la informacion');
    req.sanitizeBody('nombre'); // metodo de expressValidator()
    req.checkBody('nombre', 'You must supply a name!').notEmpty();
    req.checkBody('email', 'That Email is not valid!').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        gmail_remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
    req.checkBody('password-confirm', 'Confirmed Password cannot be blank!').notEmpty();
    req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password);

 
    const errors = req.validationErrors();
   
    if (errors) {
        res.json(errors);
        //req.flash('error', errors.map(err => err.msg));
        //res.render('register', { title: 'Register', body: req.body, flashes: req.flash() });
        //fashes: res.fashes() });
        return; //stop the fn from running
    }
    next(); // there were no errors!
    
    };

/*

exports.register = async (req, res, next) => {

    console.log('registering user');
    Usuario.register( new Usuario({email: req.body.email, nombre: req.body.nombre}), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');
    res.redirect('/');
    
  });
};
*/


exports.register = async (req, res, next) => {
    const usuario = new Usuario({email: req.body.email, nombre: req.body.nombre});
    const register = promisify(Usuario.register, Usuario);
    await register(usuario, req.body.password);
    next();
};


