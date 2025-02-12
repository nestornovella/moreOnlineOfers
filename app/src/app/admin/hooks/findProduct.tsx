


import { ProductIF } from '@/app/intefaces/modelsIntefaces';
import { useProductStore } from '@/app/store/productsStore';
import { useState } from 'react';


function useGetProduts() {
    const [Products, setProducts] = useState<ProductIF[]>([])
    const {products} = useProductStore()


    function findProduct(name:string){
        if(name){
            setProducts(products.filter( (pr:ProductIF) => pr.name.toLowerCase().includes(name.toLowerCase()))) 
        }
        else{
            setProducts([])
        }
    }



    return {
        Products,
        findProduct


    }
}

export default useGetProduts