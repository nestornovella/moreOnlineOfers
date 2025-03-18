import { CategoryIF, ProductIF } from "@/app/intefaces/modelsIntefaces"
import useGetProduts from "../../hooks/findProduct"
import Image from "next/image"
import useCategoriesHook from "../../hooks/categoriesHook"



function ModalDeleteCategory() {

    const { findCategoryByName, fondedCategory, deleteCategory } = useCategoriesHook()

    return (
        <div onClick={e => e.stopPropagation()} className="md:w-[50vw] xl:w-[30vw] flex flex-col gap-2 px-4 text-white   bg-black relative z-[1110] p-2 rounded-xl">
            <h2 className="text-white">Buscar categoria por nombre</h2>
            <input onChange={(e) => findCategoryByName(e.target.value)} placeholder="escribe aqui . . ." className="bg-black text-white border border-white p-2 rounded-xl w-full font-bold" type="text" />
            <div className="max-h-[50vh] flex flex-col gap-2 justify-center items-center overflow-scroll" style={{
                overflowY: "scroll",
                scrollbarWidth: "none", // Para Firefox
                msOverflowStyle: "none" // Para IE y Edge
            }}>
                {
                    !fondedCategory.length ?
                        <h2 className="p-4 font-semibold">No se encontraron productos intenta un nombre diferente</h2>
                        :
                        <div className="w-full flex gap-2 flex-col">
                            {
                                fondedCategory.map(ca => {
                                    return <ProductCardMenu  cb={deleteCategory} key={ca.id} category={ca} />
                                })
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default ModalDeleteCategory



function ProductCardMenu({ category, cb}: { category: CategoryIF, cb:(id:string)=>void }) {

    return (
        <div className="w-full hover:bg-[--celeste]   flex border border-[--celeste] p-1 rounded-xl gap-2 items-center font-semibold">
            <div onClick={() => {cb(category.id)}} className="text-[--celeste]  cursor-pointe hover:text-black w-full px-2 flex justify-between">
                <h2 className=" ">{category.name}</h2>
                <h2 className="text-red-600">ELIMINAR</h2>
            </div>
        </div>
    )
}