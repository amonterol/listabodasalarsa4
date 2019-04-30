/*
  Este archivo el controlador de la pagina inicial de la aplicacion,
  el metodo homepage renderiza el archivo index del directorio shop
*/
const mongoose = require('mongoose');
//const Lista = mongoose.model('Lista'); //Lista viene del modelo Listas.js
const Lista = require('../models/Lista');

exports.homepage = (req, res, next) => {
   // req.flash('error', 'Something Happened');
   // req.flash('info', 'Something Happened');
   // req.flash('warning', 'Something Happened');
   // req.flash('success', 'Something Happened');
    res.render('shop/index');
    res.end();
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
  //req.flash('success', 'Succesfully Created' );
   return res.redirect('/');
  
    
};

// nombre de la propiedad : nombre de la variable
exports.obtenerListasBodas = async (req, res, next) => {
  const listas = await Lista.find();
  console.log(listas);
  res.render('shop/listas', {title: 'Listas', listas: listas});
  res.end();
};