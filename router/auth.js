const {Router} = require('express');
const Usuario = require('../models/Usuario');
const bycript = require('bcryptjs');
const { validationResult, check } = require('express-validator');
const { generarJWT } = require('../helpers/jwt');

const router = Router();

router.post('/', [
    check('email', 'email.requerido').isEmail(),
    check('password', 'password.requerida').not().isEmpty()
], async function(req, res){

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ mensaje:errors.array() });
        }
        
        const usuario = await Usuario.findOne({ email: req.body.email });
        if (!usuario){
            return res.status(400).json({ mensaje: 'User not found ' });

        }

        const esIgual = bycript.compareSync(req.body.password, usuario.password);
        if (!esIgual){
            return res.status(400).json({ mensaje: 'User not found ' })
        }

        
        const token = generarJWT(usuario);

        res.json({ _id: usuario._id, nombre: usuario.nombre, rol: usuario.rol, email: usuario.email, access_token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Internal server error ' });
    }

});

module.exports = router;