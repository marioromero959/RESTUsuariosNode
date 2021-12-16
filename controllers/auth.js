const bcryptjs = require("bcryptjs");
const { response } = require("express");

const Usuario = require('../models/usuario')
const { generarJWT } = require("../helpers/generar-jwt")

const login = async(req,res = response)=>{
    const {correo,contraseña} = req.body
    try {
// Verificar si el email existe y si el usuario esta ativo
    const usuario = await Usuario.findOne({correo})
    if(!usuario){
        return res.status(400).json({
            msg:'El correo ingresado no es correcto'
        })
    }
    if(!usuario.estado){
        return res.status(400).json({
            msg:'El correo ingresado no es correcto - por estado'
        })
    }

// Verificar la contraseña
    const validarConstraseña = bcryptjs.compareSync(contraseña, usuario.contraseña)
    if(!validarConstraseña){
        return res.status(400).json({
            msg:'El correo ingresado no es correcto - por contraseña'
        })
    }

// Generar JWT
    const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })    
    } catch (error) {
        console.log(error);
        return res.status(500).json('Algo salio mal');
    }


}
module.exports = {
    login
}