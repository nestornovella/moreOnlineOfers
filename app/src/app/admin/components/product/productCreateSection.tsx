import TextInput from "@/app/admin/components/fields/TextInput"
import PanelInputsContainer from "../containers/PanelInputsContainer"
import ImageViewerSection from "../ImageViwerSection"
import Select from "../fields/selectCategory/Select"
import TextArea from "../fields/TextArea"
import useCreateHook from "../../hooks/createHook"
import { useEffect, useState } from "react"
import MainModal from "../modals/MainModal"
import ParenProductModal from "./ParentProductMenu"
import ImageFileInput from "../fields/ImageFileInput"
import Image from "next/image"
import useGetProduts from "../../hooks/findProduct"
import { MdDeleteOutline } from "react-icons/md";

//create componente funcial
function ProductCreateSection() {
    const [ToogleOpen, setToogleOpen] = useState(false);
    const { input, handleInput, handleProductParent, buildCategories, deleteCategory, handleCategoriesInput, handleImage, submit } = useCreateHook()
    const { Product, findProductById } = useGetProduts()


    function toogleOpen() {
        setToogleOpen((prev) => !prev)
    }

    function close() {
        setToogleOpen(false)
    }
    useEffect(() => {
        if (input.parentId) {
            findProductById(input.parentId)
        }
    }, [input.parentId])
    console.log(input)
    return (
        <div className="w-full min-h-full">
            <h2 className=" text-[--celeste] text-2xl p-2" style={{ fontFamily: 'var(--font-opensans)' }}>
                Crear Producto
            </h2>
            <hr className="border-t-4 border-[--celeste] border-solid" />

            <div className=" w-full ">
                <ImageViewerSection input={input} />
                <div className="flex gap-2 my-2 px-4">
                    <h2 className="text-white">estas creando una variedad?</h2>
                    <div className="flex flex-col  text-white gap-1 justify-center items-center">
                        <div className="flex text-white gap-1 justify-center items-center">
                            <h2>{input.parentId ? 'si' : 'no'}</h2>
                            <input className="size-5" type="checkbox" checked={input.parentId ? true : false} onChange={toogleOpen} />
                        </div>

                    </div>
                </div>
                {
                    input.parentId &&
                    <div className="p-4 flex flex-col gap-2">
                        <h2 className="text-white">estas creando una variedad de:</h2>
                        {
                            Product?.image &&
                            <div className="border rounded-xl p-2 border-[--celeste] flex justify-between items-center text-white ">
                                <Image className="size-[70] rounded-xl" alt="" src={Product.image} width={300} height={300} />
                                <h2 className="font-semibold">{Product.name}</h2>
                                <MdDeleteOutline onClick={() => handleProductParent(null)} className="text-[--celeste] hover:text-red-600 size-8" />
                            </div>

                        }

                    </div>
                }
                {
                    ToogleOpen &&
                    <div className="px-4 py-4">
                        <h2 className="text-white">Selecciona Producto Principal</h2>
                        <div>
                            <MainModal state={false} cb={toogleOpen}>
                                <ParenProductModal close={close} cb={handleProductParent} />
                            </MainModal>
                        </div>
                    </div>
                }
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
                <Select buildCategories={buildCategories} deleteCategory={deleteCategory} handleCategoriesInput={handleCategoriesInput} />
            </div>
                <div className="flex flex-col md:flex-row justify-around gap-2 my-4 md:px-20">
                    <button onClick={submit} className="border hover:border-blue-500 border-[--celeste] rounded-xl p-2 bg-[--celeste] font-semibold text-md"> Crear Producto</button>
                </div>
        </div>
    )
}

export default ProductCreateSection