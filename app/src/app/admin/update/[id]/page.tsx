'use client'

import TextInput from "@/app/admin/components/fields/TextInput"

import { useEffect, useState } from "react"

import Image from "next/image"
import useGetProduts from "../../hooks/findProduct"
import { MdDeleteOutline } from "react-icons/md";
import { FaUpload } from "react-icons/fa";
import ImageViewerSection from "../../components/ImageViwerSection"
import MainModal from "../../components/modals/MainModal"
import ParenProductModal from "../../components/product/ParentProductMenu"
import PanelInputsContainer from "../../components/containers/PanelInputsContainer"
import ImageFileInput from "../../components/fields/ImageFileInput"
import CreateCategory from "../../components/categories/CreateCategory"
import Select from "../../components/categories/Select"
import TextArea from "../../components/fields/TextArea"
import useCreateHook from "../../hooks/createHook"
import useUpdateProduct from "../updateHook"
import { useParams, useSearchParams } from "next/navigation"




//create componente funcial
function ProductCreateSection() {
    const [ToogleOpen, setToogleOpen] = useState(false);

   
    const {findProduct, input, handleImage, handleInput, submit} = useUpdateProduct()

    const {id} = useParams()

    function toogleOpen() {
        setToogleOpen((prev) => !prev)
    }

    function close() {
        setToogleOpen(false)
    }


    useEffect(()=>{
        findProduct(id as string)
    },[])
   

    return (
        <div className="w-full min-h-full">
            <h2 className=" text-[--celeste] text-2xl p-2" style={{ fontFamily: 'var(--font-opensans)' }}>
                Editar Producto
            </h2>
            <hr className="border-t-4 border-[--celeste] border-solid" />
            <div className=" w-full ">
                <ImageViewerSection input={input} />
                <PanelInputsContainer>
                    <PanelInputsContainer>
                        <TextInput label="Nombre" type="text" palceHolder="Escribe el nombre" value={input.name} name="name" onChange={handleInput} />
                        <TextInput label="Precio" type="number" palceHolder="Escribe el precio" value={input.price} name="price" onChange={handleInput} />
                    </PanelInputsContainer>
                    <div className="">
                        <ImageFileInput cb={handleImage} />
                    </div>
                </PanelInputsContainer>
                <div className="grid md:grid-cols-1 w-full px-4 mt-2">
                    <TextArea label={'Descripcion'} name='description' onChange={handleInput} palceHolder={'Escribe la descripcion del producto'} value={input.description} />
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-around gap-2 my-4 md:px-20">
                <button onClick={submit} className="border flex justify-center gap-2 items-center hover:border-blue-500 border-[--celeste] rounded-xl p-2 bg-[--celeste] font-semibold text-md">
                    <p>Guardar Cambios</p>
                    <FaUpload className="size-5" />
                </button>
            </div>


        </div>
    )
}

export default ProductCreateSection