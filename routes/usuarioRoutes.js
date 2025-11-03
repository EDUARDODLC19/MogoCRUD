const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Crear usuario
router.post('/', async (req, res) => {
    try {
        const usuario = await usuarioController.crearUsuario(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await usuarioController.obtenerUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

module.exports = router;