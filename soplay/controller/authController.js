const UsuarioService = require('../service/UsuarioService.js');
const tokenService = require('../helpers/tokenService.js');

exports.login = async (req, res) => {
    try {
        const { correo, password } = req.body;
        if (!correo || !password) {
            return res.status(400).json(
                { error: "El correo y la contraseña son obligatorios" }
            )
        }
        const id_usuario = await UsuarioService.loginUsuario(correo, password);
        const token = tokenService.generateToken(id_usuario);
        res.json(token);
        console.log(token);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo loguear el usuario", error: error.message });
    }
};

exports.register = async (req, res) => {
    try {
        const usuarioData = req.body;
        const id_usuario = await UsuarioService.addUsuario(usuarioData);
        const token = tokenService.generateToken(id_usuario);
        res.json(token);
        console.log(token);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo registar el usuario", error: error.message });
    }
};