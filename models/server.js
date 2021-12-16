const express = require('express');
const cors = require('cors');
const { dbConexion } = require('../database/config');

// En esta clase creams todo lo necesario para inicilizar la app
class Server{
    constructor(){
        this.app = express() //Creamos la aplicacion como una propiedad de la clase server
        this.port = process.env.PORT
        // Estos son los endpoints disponibles 
        this.userPath = '/api/users';
        this.authPath = '/api/auth';
        
        //Conectamos la BD
        this.conectarBD()

        // Middlewares
        this.middlewares()
        
        // rutas de la aplicacion
        this.routes()
    }

    //Conexion a BD
    async conectarBD(){
        await dbConexion();
    }

    middlewares(){
        //CORS
         this.app.use(cors()) //Leer documentacion

        // Parseo y lectura del body
        // Es para aclarar el tipo de informacion que recibimos
        this.app.use(express.json())


        // Directorio publico
        this.app.use( express.static('public'))
    }

    // Aca podemos cargar los demas enpoints
    routes(){
       this.app.use(this.authPath, require('../routes/auth')) //Llama a las rutas creadas en routes/auth.js
       this.app.use(this.userPath, require('../routes/user')) //Llama a las rutas creadas en routes/user.js
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Escuchando el puerto:',this.port)
        })
    }
}

module.exports = Server;