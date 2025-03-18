import { useEffect, useState } from 'react';
import { useCartStore } from '../store/cartStore';


function useCarrito() {

    const { cart } = useCartStore()
    const [cartProps, setCartProps] = useState({
        total: 0
    }) 

   



    return {
        
    }
}

export default useCarrito