'use client'
import { useEffect } from "react"
import { useCategoryStore } from "../store/categoryStore"
import ProductsCategoryRender from "./render/ProductsCategoryReder"
import { useProductStore } from "../store/productsStore"
import LoadingSection from "./card/LoadingCard"



function ProductsMainSection() {

    const { categories, initialCharge } = useCategoryStore()
    const {products} = useProductStore()
    

    useEffect(() => {
        if(!categories.length){
            initialCharge()
        }
    }, [])

    return (
        <div className="w-full flex flex-col text-white">


            {
                categories.length && products.length ?
                categories?.map((ct, i) => {
                    return (
                        <div className="flex flex-col items-center relative" key={ct.id}>
                            
                            <div key={i}  className={`p-1 rounded  flex justify-center w-fit relative  }`}>
                                <h2 className="font-bold text-lg md:text-2xl">{ct.name}</h2>
                            </div>


                            <div>
                                <ProductsCategoryRender subCategories={ct.subCategory} />
                            </div>
                        </div>

                    )
                }
                )
                :
                <LoadingSection/>
            }
        </div>
    )
}

export default ProductsMainSection