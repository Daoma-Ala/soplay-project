const express = require('express');
const { UsuarioService, ServicioService, CotizacionService } = require('../service/ModuloService.js');

const app = express();

app.use(express.json());

app.get('/servicios', async (req, res) => {
    try {
        const servicios = await ServicioService.consultarTodosServicios();
        res.status(200).json(servicios);
    } catch (error) {
        res.status(500).json({ message: 'Error al consultar servicios', error: error.message });
    }
});

app.get('/usuario/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await UsuarioService.consultarUsuarioPorId(id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al consultar usuario', error: error.message });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
