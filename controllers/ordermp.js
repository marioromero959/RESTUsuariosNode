const { response } = require("express");
// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});


const comprarProductos = async(req, res = response) =>{

    const {precioTotal} = req.body;

    let preference = {
        items: [
          {
            title: "Total",
            unit_price: 1,
            quantity: 1,
          },
        ],
        back_urls:{
            "success":"https://velka-accesorios.web.app/home",
            "failure":"https://velka-accesorios.web.app/home",
            "pending":"https://velka-accesorios.web.app/home",
        },
        auto_return:"approved"
      };

      try {
          const response = await  mercadopago.preferences.create(preference)
          const preferenceID = response.body.id
          res.send({preferenceID})
      } catch (error) {
        console.log(error)
        return res.status(500).json('Algo salio mal');       
      }


}
module.exports = {
    comprarProductos
}