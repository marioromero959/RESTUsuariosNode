const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol='') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

const emailExiste = async(correo = '') =>{
    const existeEmail = await Usuario.findOne({correo})
    if(existeEmail){
        throw new Error(`El email ${correo} ya se encuentra en uso`)
    }
}

const idExiste = async(id) =>{
    const existeId = await Usuario.findById(id)
    if(!existeId){
        throw new Error(`El id ingresado ya se encuentra en uso`)
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    idExiste,
}