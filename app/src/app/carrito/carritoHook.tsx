import { useEffect, useState } from "react"
import { useCartStore } from "../store/cartStore"



function useCarrito() {

    const { cart } = useCartStore()
    const [total, setTotal] = useState(0)

    

    function getTotal() {
        const total = Object.values(cart).map(pr => pr.subTotal).reduce((prev, curr) => prev + curr, 0)
        setTotal(total)
    }

    useEffect(() => {
        getTotal()
    }, [cart])


    return {
        total
    }
}

export default useCarrito