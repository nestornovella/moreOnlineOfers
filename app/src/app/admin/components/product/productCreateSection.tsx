import TextInput from "@/app/admin/components/fields/TextInput"
import PanelInputsContainer from "../containers/PanelInputsContainer"
import ImageViewerSection from "../ImageViwerSection"
import Select from "../fields/selectCategory/Select"
import TextArea from "../fields/TextArea"
import useCreateHook from "../../hooks/createHook"
import { useState } from "react"
import MainModal from "../modals/MainModal"
import ParenProductModal from "./ParentProductMenu"

//create componente funcial
function ProductCreateSection() {
    const [ ToogleOpen, setToogleOpen ]= useState(false);
    const { input, handleInput, handleProductParent, buildCategories, deleteCategory, handleCategoriesInput } = useCreateHook()


    console.log(input)
    function toogleOpen(){
        setToogleOpen((prev) => !prev)
    }

    return (
        <div className="w-full min-h-full">
            <h2 className=" text-[--celeste] text-2xl p-2" style={{ fontFamily: 'var(--font-opensans)' }}>
                Crear Producto
            </h2>
            <hr className="border-t-4 border-[--celeste] border-solid" />

            <div className=" w-full ">
                <ImageViewerSection />
                <div className="flex gap-2 my-2 px-4">
                    <h2 className="text-white">estas creando una variedad?</h2>
                    <div className="flex text-white gap-1 justify-center items-center">
                        <h2>{ToogleOpen ? 'si' : 'no'}</h2>
                        <input className="size-5" type="checkbox"  checked={ToogleOpen} onChange={toogleOpen} />
                    </div>
                </div>
                    {
                        ToogleOpen &&
                        <div className="px-4 py-4">
                            <h2 className="text-white">Selecciona Producto Principal</h2>
                            <div>
                                <MainModal state={false} cb={toogleOpen}>
                                    <ParenProductModal cb={handleProductParent}/>
                                </MainModal>
                            </div>
                        </div>
                    }
                <PanelInputsContainer>
                    <PanelInputsContainer>
                        <TextInput label="Nombre" type="text" palceHolder="Escribe el nombre" value={input.name} name="name" onChange={handleInput} />
                        <TextInput label="Precio" type="number" palceHolder="Escribe el precio" value={input.price} name="price" onChange={handleInput} />
                    </PanelInputsContainer>
                    <PanelInputsContainer>
                        <TextInput label="category" type="email" palceHolder="Select category" value="" name="category" onChange={handleInput} />
                        <TextInput label="Email" type="email" palceHolder="Email" value="" name="email" onChange={handleInput} />
                    </PanelInputsContainer>
                </PanelInputsContainer>
                <div className="grid md:grid-cols-1 w-full px-4 mt-2">
                    <TextArea label={'Descripcion'} name='description' onChange={handleInput} palceHolder={'Escribe la descripcion del producto'} value={input.description} />
                </div>
                <Select buildCategories={buildCategories} deleteCategory={deleteCategory} handleCategoriesInput={handleCategoriesInput} />
            </div>
        </div>
    )
}

export default ProductCreateSection