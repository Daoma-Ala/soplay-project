const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

exports.generateToken = (id_usuario, rol) => {
    const expiresIn = 60;
    const token = jwt.sign({ id_usuario, rol }, secretKey, { expiresIn });
    return token;
}