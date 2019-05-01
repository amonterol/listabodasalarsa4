const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const productoSchema = new Schema({
    nombre: {
        type: String, 
        trim: true,
        required: 'Please enter un nombre de producto'
    },
    descripcion: {
        type: String,
        trim:true,
        required: true
    },
    precio: {
        type: String,
        trim:true,
        required: true
    },
    cantidad: {
        type: String,
        trim:true,
        required: true
    },
    imagen: {
        type: String,
        trim:true,
        required: true
    }  

});

module.exports = mongoose.model('Producto', productoSchema); 