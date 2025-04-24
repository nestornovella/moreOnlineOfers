'use client'
import { ProductIF } from "@/app/intefaces/modelsIntefaces"
import useGetProduts from "../hooks/findProduct"
import Image from "next/image"
import { RiDeleteBin6Line } from "react-icons/ri"
import useDeleteProduct from "./deleteHook"
import {  useRef } from "react"

function DeleteProductModal() {

    const {deleteProduct} = useDeleteProduct()
    const {findProduct, Products} = useGetProduts()
    const ref = useRef(null)
    

    return (
        <div onClick={e => e.stopPropagation()} className="md:w-[50vw] w-screen xl:w-[30vw] flex flex-col gap-2 px-4 text-white   bg-black relative z-[1110] p-2 rounded-xl">
            <h2 className="text-white">Buscar producto por nombre</h2>
            <input ref={ref} onChange={(e) => findProduct(e.target.value)} placeholder="escribe aqui . . ." className="bg-black text-white border border-white  p-2 rounded-xl w-full font-bold" type="text" />
            <div className="max-h-[50vh] w-full flex flex-col gap-2 justify-center items-center overflow-scroll">
                {
                    !Products.length ?
                        <h2 className="p-4 font-semibold">No se encontraron productos intenta un nombre diferente</h2>
                        :
                        <div className="w-full ">
                            {
                                Products.map(pr => {
                                    return <ProductCardMenu  cb={deleteProduct} key={pr.id} product={pr} />
                                })
                            }
                            
                        </div>
                }
            </div>
        </div>
    )
}

export default DeleteProductModal


function ProductCardMenu({ product, cb }: { product: ProductIF, cb:(id:string)=>void}) {

    return (
        <div className="w-full flex border border-[--celeste] p-1 rounded-xl gap-2 items-center font-semibold">
            <Image className="size-[80px] rounded-2xl object-cover" src={`${product.image}`} width={300} quality={70} height={300} alt="" />
            <div className="flex justify-between items-center w-full px-2">
                <h2 className="text-[--celeste]">{product.name}</h2>
                <RiDeleteBin6Line onClick={()=>{cb(product.id)}} className="text-red-600 size-9"/>
            </div>
        </div>
    )
}