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

        const data = await UsuarioService.loginUsuario(correo, password);
        const token = tokenService.generateToken(data.id_usuario, data.tipo);


        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 3600000,
            path: '/'
        });


        res.status(200).json({ message: 'Usuario autenticado', id_usuario: data.id_usuario, rol: data.tipo });
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

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 3600000,
            path: '/'
        });

        res.status(201).json({ message: 'Usuario autenticado', id_usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo registar el usuario", error: error.message });
    }
};

exports.protected = async (req, res) => {
    try {
        res.status(200).json(req.rol);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo validar el usuario", error: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            path: '/',
        });

        res.status(200).json({ message: "Sesión cerrada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo cerrar la sesión", error: error.message });
    }
};