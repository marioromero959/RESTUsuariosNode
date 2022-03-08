const { response } = require("express");
// SDK de Nodemailer
const nodemailer = require("nodemailer");

const enviarEmail = async(req, res = response) =>{

    const email = req.body.emailBody;
    console.log(email)

}
module.exports = {
    enviarEmail
}