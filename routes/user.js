const { Router } = require('express'); //Usamos la funcion Router de express
const { check } = require('express-validator');
const { usersGet, usersPost, usersPut, usersDelete, usersPatch } = require('../controllers/user');
const { validarCampos } = require("../middlewares/validar-campos");
const { esRolValido,emailExiste,idExiste } = require('../helpers/db-validators');

const router = Router();

router.get('/',usersGet)

//El id es uno de los parametros que enviamos en la url
router.put('/:id',[
    check('id','No es un id valido').isMongoId(), //Revisamos que el id enviado corresponda al de un usuario registrado
    check('id').custom(idExiste), //Revisamos si existe
    validarCampos, //No deja continuar si no pasa las validaciones
], usersPut) 

//Enviamos el campo que queremos revisar con el check
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), //Revisamos si esta vacio o no 
    check('contraseña', 'La contraseña debe ser de mas de 6 letras').isLength({min:6}), //Revisamos que la contraseña tenga almenos 6 caracteres
    check('correo', 'El correo no es valido').isEmail(), //Revisamos si es un email
    check('correo').custom( emailExiste ), //Revisamos si es un email existente
    check('rol').custom( esRolValido ),
    validarCampos,
], usersPost) //El argumento del medio es un middleware

router.patch('/', usersPatch)

//Mismas validaciones que el put
router.delete('/:id',[
    check('id','No es un id valido').isMongoId(), 
    check('id').custom(idExiste),
    validarCampos,
], usersDelete)


module.exports = router;