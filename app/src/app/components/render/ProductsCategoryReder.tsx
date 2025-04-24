import { CategoryIF } from "@/app/intefaces/modelsIntefaces"
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
                        <div className=" font-semibold  px-3  m-auto mt-4 mb-2 w-full flex justify-satrt ">
                            <h2 className=" p-1 rounded-sm">{category.name}</h2>
                        </div>
                        <ProdcutRender category={category} />
                    </div>
                })
            }
        </div>
    )
}

export default ProductsCategoryRender