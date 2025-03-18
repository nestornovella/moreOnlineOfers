import { useEffect, useState } from 'react';
import { useProductStore } from '../../store/productsStore';
import { ProductIF } from '../../intefaces/modelsIntefaces';



function useDetail() {
    const { initialCharge, products } = useProductStore()
    const [product, setProduct] = useState<ProductIF | null>(null)

  

    useEffect(()=>{if(!products.length){initialCharge()}},[])

    async function findProduct(id: string) {
        
        
        let founded = products.find(pr => pr.id === id) || null

        if(!founded){
            products.forEach(pr => {
                const foundVariety = pr.varieties?.find(p => p.id === id) || null;
                if(foundVariety){
                    founded = foundVariety
                }
                
            })
        }

        setProduct(founded)
        

    }



    return {
        product,
        findProduct

    }
}

export default useDetail