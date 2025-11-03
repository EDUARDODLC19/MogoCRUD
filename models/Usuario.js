const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    edad: { type: Number }
});

module.exports = mongoose.model('Usuario', usuarioSchema);