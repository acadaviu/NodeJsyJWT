const {Router} = require('express');
const router = Router();
const Usuario = require('../models/Usuario');
// const { validationResult, check } = require('express-validator');
const bycript = require('bcryptjs');
const { validationResult, check } = require('express-validator');
const { validarJWT } = require('../middleware/validar-jwt');
const { validaRolAdmin } = require('../middleware/validar-rol-admin');


router.post('/',   


[
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
    check('password', 'invalid.password').not().isEmpty(),
    check('rol', 'invalid.rol').isIn(['ADMIN', 'DOCENTE']),
    check('estado', 'invalid.rol').isIn(['Activo', 'Inactivo']),
    validarJWT,
    validaRolAdmin
], async function(req, res){

    try {
        
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ mensaje: errors.array() });
            }

        const existeUsuario = await Usuario.findOne({email: req.body.email});
        console.log('Respuesta existe usuario', existeUsuario);
        if(existeUsuario){
            return res.send ('Email ya existe');
        }

        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;

        const salt = bycript.genSaltSync();
        const password = bycript.hashSync(req.body.password, salt);
        usuario.password = password; 
        
        usuario.rol = req.body.rol;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save(); 

    res.send(usuario);
    } catch (error) {
        console.log(error);
        res.send("Ocurrio un error");
    }
});
router.get('/', [validarJWT, validaRolAdmin], async function(req, res){
    try{
        const usuarios = await Usuario.find();
        res.send(usuarios);
    } catch(error){
        console.log(error);
        res.send("Ocurrio un error");
    }
    
});

router.put('/:usuarioId', [validarJWT, validaRolAdmin], async function(req, res){
    try {
        console.log("Objeto recibido", req.body, req.params);
        
        let usuario = await Usuario.findById(req.params.usuarioId);

        if(!usuario){
            return res.send('Usuario no existe');
        }
        
        const existeUsuario = await Usuario
            .findOne({ email: req.body.email, _id: { $ne: usuario._id }});

        console.log('Respuesta existe usuario', existeUsuario);
        
        if(existeUsuario){
            return res.send('Email ya existe');
        }

        usuario.email = req.body.email;
        usuario.nombre = req.body.nombre;
        usuario.estado = req.body.estado;
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save(); 

        res.send(usuario);

    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
});

module.exports = router;