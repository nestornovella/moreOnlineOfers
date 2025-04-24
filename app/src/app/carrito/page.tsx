import { Suspense } from "react";
import Carrito from "./Carrito";
import TransitionPage from "../components/containers/TransitionPage";


function CarritoPage(){


    return(
        <Suspense fallback={<div>Cargando...</div>}>
            <TransitionPage/>
            <Carrito/>  
        </Suspense>
    )   


}


export default CarritoPage;