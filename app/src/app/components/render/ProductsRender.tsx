import { CategoryIF } from "@/app/intefaces/modelsIntefaces"
import { useProductStore } from "@/app/store/productsStore"
import ProductCard from "../card/ProductCard"

interface Props {
    category: CategoryIF
}

function ProductRender({ category }: Props) { 
    const { products } = useProductStore()

    // Filtramos los productos por categoría
    const filteredProducts = products.filter(pr => 
        pr.categories.some(p => p.name.includes(category.name))
    )

    return (
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-2">
            {filteredProducts.map((prod, index) => {
                const isLastOdd = index % 2 === 0 && index === filteredProducts.length - 1
                return (
                    <div key={prod.id} className={isLastOdd ? "col-span-2" : ""}>
                        <ProductCard product={prod} />
                    </div>
                )
            })}
        </div>
    )
}

export default ProductRender
