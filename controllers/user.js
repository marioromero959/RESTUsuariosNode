const { response } = require('express')
const Usuario = require('../models/usuario') //Siempre con mayuscula para poder crear instancias del modelo
const bcryptjs = require('bcryptjs');

// Aca creamos las funciones

const usersGet = async(req, res = response)=>{
    
    const { limite = 5, desde = 0} = req.query; //Parametros que envio en la url ?param=valor&param=valor
    const usuarios = await Usuario.find() ///Obtenemos todos los usuarios
        .skip(Number(desde))
        .limit(Number(limite)) //Le damos el limite de cantidad de usuarios que queremos 

              
    res.json({
        usuarios
    })

}

const usersPost = async(req, res = response)=>{
    const {nombre, correo, contraseña, rol} = req.body;
    const usuario = new Usuario({nombre, correo, contraseña, rol});//Solo toma los parametros del modelo

// Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); //Es el nivel de encriptacion, defalut 10
    usuario.contraseña = bcryptjs.hashSync(contraseña,salt) //Para encriptar por una sola via

// Con esto grabamos los datos en la bd
    await usuario.save();

    res.json({
        usuario
    })
}

const usersPut = async(req, res = response)=>{
    const id = req.params.id; //Esto lo mandamos en la ruta(el mismo nombre)
    const { _id,contraseña, google,correo, ...resto } = req.body; //resto son los demas argumentos
//Validar conrta base de datos
    if(contraseña){
        const salt = bcryptjs.genSaltSync();
        resto.contraseña = bcryptjs.hashSync(contraseña,salt) 
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto) //Con el id, actualiza el resto de campos

    res.json(usuario)
};

const usersPatch = (req, res = response)=>{
    res.json({
        msg:'patch API'
    })
}
const usersDelete = (req, res = response)=>{
    res.json({
        msg:'delete API'
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}