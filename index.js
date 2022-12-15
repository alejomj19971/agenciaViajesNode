
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';



const app=express();
// conectar la base de datos
db.authenticate().then(()=>console.log('Base de datos conectada')).catch(error=>console.log(error))
// Definir puerto
const port=process.env.PORT||4000;


// habilitar pug
app.set('view engine','pug');

//obtener el año actual
app.use((req,res,next)=>{
    const year=new Date();
    res.locals.actualYear=year.getFullYear();
    res.locals.nombreSitio='Agencia de Viajes'
    return next();
   
})

// Agregar body parseer leer los datos del formulario 
app.use(express.urlencoded({extended:true}));

// Definir la carpeta pública
app.use(express.static('public'))

//Agregar Router
app.use('/',router)




app.listen(port,()=>{
    console.log(`El Servidor esta funcionando en el puerto ${port}`)
})