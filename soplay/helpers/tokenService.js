const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

exports.generateToken = (id_usuario) => {
    const expiresIn = 120;
    const token = jwt.sign({ userId: id_usuario }, secretKey, { expiresIn });
    return token;
}