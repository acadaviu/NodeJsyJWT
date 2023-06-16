const validarInventario = (req) => {
    const validaciones = [];

    if (!req.body.serial){
        validaciones.push('Serial es requerido');
    }
    
    if (!req.body.modelo){
        validaciones.push('Modelo es requerido');
    }
    
    if (!req.body.descripcion){
        validaciones.push('Descripcion es requerida');
    }
    
    if (!req.body.foto){
        validaciones.push('Fotoes requerida');
    }
    
    if (!req.body.fechaCompra){
        validaciones.push('Fecha de compra es requerida');
    }
    
    if (!req.body.precio){
        validaciones.push('Precio es requerido');
    }
    
    if (!req.body.usuario){
        validaciones.push('Usuario es requerido');
    }
    
    if (!req.body.marca){
        validaciones.push('Marca es requerida');
    }
    
    if (!req.body.tipoEquipo){
        validaciones.push('Tipo de equipo es requerido');
    }

    if (!req.body.estadoEquipo){
        validaciones.push('Estado de equipo es requerido');
    }

    return validaciones;
}

module.exports ={
    validarInventario
}