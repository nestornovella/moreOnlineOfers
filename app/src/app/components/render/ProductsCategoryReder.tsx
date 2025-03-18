import { CategoryIF } from "@/app/intefaces/modelsIntefaces"
import { useProductStore } from "@/app/store/productsStore"
import ProdcutRender from "./ProductsRender"



interface Props {
    subCategories: CategoryIF[]
}



function ProductsCategoryRender({ subCategories }: Props) {


    return (
        <div style={{fontFamily:`var(--font-roboto)`}}>
            {
                subCategories?.map((category, index) => {
                    return <div key={index} className="p-2 w-full">
                        <div className=" border-2 border-[--verde] bg-[--verde] text-lg  text-white font-bold  px-3  m-auto mt-4 mb-2 w-full flex justify-center ">
                            <h2 className=" text-md
                            ">{category.name}</h2>
                        </div>
                        <ProdcutRender category={category} />
                    </div>
                })
            }
        </div>
    )
}

export default ProductsCategoryRender