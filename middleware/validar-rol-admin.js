const jwt = require('jsonwebtoken');

const validaRolAdmin = (req, res, netx) =>{
    if (req.payload.rol !== 'ADMIN') {
        return res.status(401).json({ mensaje: 'Error unauthorized' });
    }
    netx();
}

module.exports = {
    validaRolAdmin
}