//Importar el controlador
import { Testimonial } from "../models/Testimoniales.js"

const guardarTestimonial=async(req,res)=>{
    //Validar el formulario

    const errores=[]
    const{nombre,correo,mensaje}=req.body
    if(nombre.trim()===""){
        errores.push({mensaje:"El nombre está vacio"})
    }
    if(correo.trim()===""){
        errores.push({mensaje:"El correo está vacio"})
    }
    if(mensaje.trim()===""){
        errores.push({mensaje:"El mensaje está vacio"})
    }

    if(errores.length>0){
        // Consultar Testimoniales Existentes
        const testimoniales=await Testimonial.findAll();
        //Mostrar la vista con errores
        res.render('testimoniales',{
            pagina:'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    }else{
        //Almacenar en la base de datos
        try {
            await Testimonial.create({
                nombre,correo,mensaje
                
            })
           res.redirect('/testimoniales')
        } catch (error) {
            console.log(error)
        }
    }
}


export{
    guardarTestimonial,
}

