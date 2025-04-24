import { Suspense } from "react";
import Carrito from "./Carrito";


function CarritoPage(){


    return(
        <Suspense fallback={<div>Cargando...</div>}>
            <Carrito/>  
        </Suspense>
    )   


}


export default CarritoPage;