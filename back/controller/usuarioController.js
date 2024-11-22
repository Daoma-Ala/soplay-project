const UsuarioServicio = require('../service/UsuarioService.js');

exports.getAllUsuarios = async (req, res) => {
    try {
        const usaurios = await UsuarioServicio.getAllUsuarios();
        res.status(200).json(usaurios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo consultar todos los usuarios", error: error.message });
    }
};

exports.addUsuario = async (req, res) => {
    try {
        const usuarioData = req.body;
        const id_usuario = await UsuarioServicio.addUsuario(usuarioData);
        res.status(201).json({ id_usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo agregar el usuario", error: error.message });
    }
};

exports.getUsuarioById = async (req, res) => {
    try {
        const id_usuario = parseInt(req.params.id);
        if (isNaN(id_usuario)) {
            return res.status(400).json({ error: 'ID del Usuario no válido' });
        }
        const usuario = await UsuarioServicio.getUsuarioById(id_usuario);

        if (!usuario) {
            return res.status(404).json({ error: 'usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo obtener al usuario", error: error.message });
    }
};

exports.updateUsuario = async (req, res) => {
    try {
        const id_usuario = parseInt(req.params.id);
        if (isNaN(id_usuario)) {
            return res.status(400).json({ error: 'ID del Usuario no válido' });
        }
        const usuarioData = req.body;
        await UsuarioServicio.updateUsuario(id_usuario, usuarioData);
        res.status(200).json({ message: 'Usuario actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo actualizar el usuario", error: error.message });
    }
};

exports.deleteUsuario = async (req, res) => {
    try {
        const id_usuario = parseInt(req.params.id);
        if (isNaN(id_usuario)) {
            return res.status(400).json({ error: 'ID del Usuario no válido' });
        }
        await UsuarioServicio.deleteUsuario(id_usuario);
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo eliminar el usuario", error: error.message });
    }
};

