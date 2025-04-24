import { useEffect, useState } from 'react';
import { useCartStore } from '../store/cartStore';


//https://api.whatsapp.com/send?phone=${seller.phoneNumber}&text=${dataText}
function useWhatsappHook() {

    const {cart} = useCartStore()
   
    
    const [seller, setSeller] = useState(null)
    const [link, setLink] = useState(null)

    useEffect(()=>{
        let template = `::::::PEDIDO::::::\n`
        Object.values(cart).forEach(pr => { template += '\n' + pr.product.name.trim() + '\nCantidad: ' + pr.quantity + '\nSubTotoal: ' + '$ ' +  pr.subTotal + '\n-------------------------'})
        template += '\n\n Total a abonar: $ ' + Object.values(cart).reduce((prev, curr) => prev + curr.subTotal,0)
        setLink(`https://api.whatsapp.com/send?phone=${seller?.phoneNumber ? seller.phoneNumber : '+540111525420570'}&text=${encodeURIComponent(template)}`)
    }, [seller, cart])

    async function findSeller(sellerId?:string | null){
        if(sellerId){
            const seller = await fetch(`/api/seller/${sellerId}`)
            const sellerToJson = await seller.json()

            setSeller(sellerToJson)
        }else{
            setSeller(null)
        }
    }


    

    return {
        findSeller,
        link
    }
}

export default useWhatsappHook