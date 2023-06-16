const jwt = require('jsonwebtoken');

const generarJWT = (usuario) =>{
    const payload = { _id: usuario._id, nombre: usuario.nombre, email: usuario.email, password: usuario.password, rol: usuario.rol, estado: usuario.estado };

    const token = jwt.sign(payload, '12345', { expiresIn: '24h' });
    return token;
}
module.exports = {
    generarJWT
}