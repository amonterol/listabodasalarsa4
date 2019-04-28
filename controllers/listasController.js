/*
  Este archivo el controlador de la pagina inicial de la aplicacion,
  el metodo homepage renderiza el archivo index del directorio shop
*/
const mongoose = require('mongoose');
//const Lista = mongoose.model('Lista'); //Lista viene del modelo Listas.js
const Lista = require('../models/Lista');

exports.homepage = (req, res, next) => {
    res.render('shop/index');
};


exports.agregarListaBodas = (req, res, next) => {
    res.render('shop/agregarLista', {title: 'Agregar Lista'});
};

//Usamos composicion
exports.crearListaBodas = async (req, res, next) => {
  const lista = new Lista(req.body);
  await lista.save(); // Almacenamos en mongodb la lista creada
  //console.log(req.body);//Solo para corroborar el funcionamiento
  //res.json(req.body); //Solo para corroborar el funcionamiento
  res.redirect('/');
    
};