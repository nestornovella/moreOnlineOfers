


import { ProductIF } from '@/app/intefaces/modelsIntefaces';
import { useProductStore } from '@/app/store/productsStore';
import { useState } from 'react';


function useGetProduts() {
    const [Products, setProducts] = useState<ProductIF[]>([])
    const { products } = useProductStore()
    const [Product, setProduct] = useState<ProductIF | null>(null)

    function findProduct(name: string) {
        if (name) {
            console.log(products)
            setProducts(products.filter((pr: ProductIF) => pr.name.toLowerCase().includes(name.toLowerCase())))
        }
        else {
            setProducts([])
        }
    }

    function findProductById(id: string) {
        if (id) {

            const product = products.find((pr: ProductIF) => pr.id == id)
            if (product) setProduct(product)

        }
        else {
            setProduct(null)
        }
    }



    return {
        Products,
        Product,
        findProduct,
        findProductById
    }
}

export default useGetProduts