const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const listaSchema = new Schema({
    name: {
        type: String, 
        trim: true,
        required: 'Please enter un nombre de pareja'
    },
    lugar: {
        type: String,
        trim:true,
        required: true
    },
    fecha: {
        type: String,
        trim:true,
        required: true
    },
    estado: {
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

module.exports = mongoose.model('Lista', listaSchema); 