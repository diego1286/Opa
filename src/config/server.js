// traer los modulos que son necesarios en el proyecto
const express= require('express');
const path= require('path');
const dotenv= require('dotenv');
const sessions= require('express-session');
const cors= require('cors');




const app = express();// inicializacion del servidor
// configuraciones del servidor 
// configuar puerto
app.set('port',process.env.PORT || 9000);

// middlewares (para recibir facilemnte info de formularios) en el proyecto
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());


// configurar dotenv variables de entorno para conectar al la bd y las rutas de acceso a estas
dotenv.config({path: path.join(__dirname,'../env/.env')});

// confugurar el manejo de sessions dentro de la aplicacion 
app.use(sessions({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

module.exports=app;









