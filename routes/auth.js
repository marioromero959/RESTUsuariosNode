const { Router } = require('express'); //Usamos la funcion Router de express
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post('/login',[
    check('correo','El correo es obligarorio').isEmail(),
    check('contraseña','La contraseña es obligaroria').not().isEmpty(),
    validarCampos
],login)

module.exports = router;