const Usuario = require('../models/Usuario');
exports.crearUsuario = async (datos) => {
    const nuevoUsuario = new Usuario(datos);
    return await nuevoUsuario.save();
};
exports.obtenerUsuarios = async () => {
    return await Usuario.find();
};
exports.obtenerUsuarioPorId = async (id) => {
    return await Usuario.findById(id);
};
exports.actualizarUsuario = async (id, datos) => {
    return await Usuario.findByIdAndUpdate(id, datos, { new: true });
};
exports.eliminarUsuario = async (id) => {
    return await Usuario.findByIdAndDelete(id);
};