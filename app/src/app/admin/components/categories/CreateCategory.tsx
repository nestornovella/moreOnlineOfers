'use client'

import { useState } from "react";
import TextInput from "../fields/TextInput";
import MainModal from "../modals/MainModal";
import ModalDeleteCategories from "./modalDeleteCategories";

interface PropIF {
    cb: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function CreateCategory({ input, cb, buildCategory, isOpen, toogleOpen, submit }) {

    const [open, setOpen] = useState(false)

    function handleOpenStatus() {
        setOpen(prev => !prev)
    }

    function handleCheck() {
        toogleOpen()
    }

    return (
        <div className="text-white p-4">
            <div className="flex items-center gap-1 text-sm">
                <p>Desea Crear una nueva categoria?</p>
                <input onChange={handleCheck} type="checkbox" className="size-5" checked={isOpen} />
            </div>
            {
                isOpen &&
                <div>
                    <div className="pt-2">
                        <TextInput label="Nombre de la nueva categoria" name="newCategory" palceHolder="ingrese el nobre de la categoria que desea crear" type="text" value={input.category} onChange={cb} />
                    </div>
                    <div>
                        <p className="text-xs mt-2 text-yellow-600">Importante</p>
                        <p className="text-xs ml-2">si desea crear una sub categoria puede seleccionar la categoria superior en el selector.</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm mt-4">
                        <p>Desea eliminar una categoria</p>
                        <input onChange={handleOpenStatus} type="checkbox" className="size-5" checked={open} />
                    </div>
                    <MainModal cb={handleOpenStatus} state={false} isOpen={open} key={1}>
                        <ModalDeleteCategories />
                    </MainModal>
                    {
                        buildCategory[0] &&
                        <div className="mt-2 border p-2 rounded-xl border-blue-600">
                            <p className="text-xs">la categoria que esta creando extiende de:</p>
                            <p>
                                {
                                    buildCategory[0]?.name
                                }
                            </p>
                        </div>
                    }
                </div>
            }

        </div>
    )
}

export default CreateCategory