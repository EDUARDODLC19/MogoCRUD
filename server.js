// --- 1. DEPENDENCIAS Y CONFIGURACIÓN INICIAL 
const EXPRESS_APP = require('express'); 
const MONGODB_CLIENT = require('mongoose');
const ctrl = require('./controllers/usuarioController');

// --- 2. CONFIGURACIÓN DE CONSTANTES Y APP ---
const app = EXPRESS_APP(); 
const SERVER_PORT = 3000;
const DB_URI = 'mongodb://localhost:27017/mi_base_datos';

// Middleware
app.use(EXPRESS_APP.json());

// --- 3. CONEXIÓN A MONGODB ---
MONGODB_CLIENT.connect(DB_URI)
  .then(() => console.log('--- DB STATUS: ✅ Conexión a MongoDB establecida ---'))
  .catch(err => console.error('--- DB STATUS: FATAL ERROR al conectar a MongoDB:', err));


// --- 4. RUTAS DE LA API (CRUD) ---

// POST: CREAR USUARIO
app.post('/usuarios', async (req, res) => {
    try {
        const usr = await ctrl.crearUsuario(req.body);
        res.status(201).json(usr);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// GET: OBTENER TODOS
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await ctrl.obtenerUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno del servidor al obtener lista' });
    }
});

// GET: OBTENER POR ID
app.get('/usuarios/:id', async (req, res) => {
    try {
        const usr = await ctrl.obtenerUsuarioPorId(req.params.id);

        if (!usr) return res.status(404).json({ mensaje: 'Recurso no encontrado' });

        res.status(200).json(usr);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al procesar la solicitud de búsqueda' });
    }
});

// PUT: ACTUALIZAR POR ID
app.put('/usuarios/:id', async (req, res) => {
    try {
        const usr = await ctrl.actualizarUsuario(req.params.id, req.body);

        if (!usr) return res.status(404).json({ mensaje: 'Usuario a actualizar no encontrado' });

        res.status(200).json(usr);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// DELETE: ELIMINAR POR ID
app.delete('/usuarios/:id', async (req, res) => {
    try {
        const usr = await ctrl.eliminarUsuario(req.params.id);

        if (!usr) return res.status(404).json({ mensaje: 'Usuario para eliminar no encontrado' });

        res.status(200).json({ mensaje: 'El usuario fue eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Fallo al eliminar el recurso' });
    }
});


// --- 5. INICIO DEL SERVIDOR ---
app.listen(SERVER_PORT, () => console.log(`🚀 Servidor de usuarios en http://localhost:${SERVER_PORT}`));