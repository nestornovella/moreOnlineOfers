'use client'
import { useEffect } from "react"
import MainContainer from "../components/containers/MainContainer"
import ProductCreateSection from "./components/product/productCreateSection"
import { useCategoryStore } from "../store/categoryStore"
import { useProductStore } from "../store/productsStore"


function PanelAdmin() {

    const categories = useCategoryStore()
    const products = useProductStore()

    async function initial(){
        const categoriesStatus = await categories.initialCharge()
        if(categoriesStatus == 200){
            console.log('categorias inicializadas')
            const productStatus = await products.initialCharge()
            if(productStatus == 200){
                console.log('productos inicializados')
            }
        }else{
            console.log('ERROR => problemas para inicializar')
        }
    }

    useEffect(()=>{
        initial()
    },[])

    
    return (
        <MainContainer >
            <h2 className="text-white text-3xl p-2 " style={{ fontFamily: 'var(--font-opensans)' }}>
                Panel Admin
            </h2>
            <ProductCreateSection/>
            

        </MainContainer>
    )
}
export default PanelAdmin