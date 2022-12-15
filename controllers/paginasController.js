import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio= async(req,response)=>{
    // Consultar 3 viajes del modelo Viaje

    //Multiples consultas promise
    const promiseDB=[]
    promiseDB.push(Viaje.findAll({limit:3}));
    promiseDB.push(Testimonial.findAll({limit:3}));
    try {
       const resultado=await Promise.all(promiseDB);
        response.render('inicio',{
            pagina:'Inicio',
            clase:'home',
            viajes:resultado[0],
            testimoniales:resultado[1]
        });
    } catch (error) {
        console.log(error)
    }
  
}

const paginaNosotros=(req,response)=>{
    response.render('nosotros',{
        pagina:'Nosotros',
        //o viajes si tienen el mismo nombre
        }
    )}

const paginaTestimoniales=async(req,response)=>{
   try {
    const testimoniales=await Testimonial.findAll();
    response.render('testimoniales',{
        pagina:'Testimoniales',
        testimoniales
            //o viajes si tienen el mismo nombre
     })
    
   } catch (error) {
    console.log(error)
   }
}

const paginaViajes= async(req,response)=>{
    //Consultar base de datos
    const viajes=await Viaje.findAll();
    console.log(viajes)
    response.render('viajes',{
        pagina:'Próximos viajes',
        viajes,
            
     }
)}

//Muestra un viaje por su slug
const paginaDetalleViaje=async(req,res)=>{
  const{slug} =(req.params)

  try {
    const viaje =await Viaje.findOne({ where : {slug}});
    res.render('viaje',{
        pagina:'Información viaje',
        viaje

    })
  } catch (error) {
    
  }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaTestimoniales,
    paginaViajes,
    paginaDetalleViaje,
    
}