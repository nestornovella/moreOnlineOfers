import { CategoryIF } from "@/app/intefaces/modelsIntefaces"
import ProdcutRender from "./ProductsRender"
import Category from "./Category"



interface Props {
    subCategories: CategoryIF[]
}



function ProductsCategoryRender({ subCategories }: Props) {


    return (
        <div style={{fontFamily:`var(--font-roboto)`}}>
            {
                subCategories?.map((category, index) => {
                    return <div key={index} className="p-2 w-full">
                        <Category category={category.name} />
                        <ProdcutRender category={category} />
                    </div>
                })
            }
        </div>
    )
}

export default ProductsCategoryRender