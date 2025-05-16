import { useEffect, useRef, useState } from "react";
import { TiArrowUnsorted } from "react-icons/ti";
import TextInput from "./TextInput";

interface InputState {
    name: string;
    description: string;
    price: number;
    image: string;
    categories: string[];
    parentId: null | string
    newCategory: string
    parentCategory: string
    measureUnits: string
    measureValue: number
}

function SelectorMesure({ input, handleInput }: { input: InputState, handleInput: (e: React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLInputElement>) => void }) {
    const [open, setOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    console.log(input,  "este es le imput")

    return (
        <div className=" w-fit flex gap-4 items-center border rounded-lg p-2 border-[--verde]">
            <div >
                <button className="bg-[--celeste] text-black rounded-lg p-2 font-semibold flex justify-between items-center" onClick={() => { setOpen(!open) }}>
                    {!input.measureUnits ? 'S/U' : input.measureUnits} <TiArrowUnsorted className="text-[--celeste] text-black" />
                </button>
                {
                    open &&
                    <div className="border  text-white  flex  p-1 text-md rounded w-full " ref={menuRef}>

                        <div className="flex flex-col ">
                            <button className="p-2 hover:bg-[--celeste] rounded-lg" value="Kg" name="measureUnits" onClick={(e) => { handleInput(e); setOpen(!open) }}>Kg</button>
                            <button className="p-2 hover:bg-[--celeste] rounded-lg" value="Gr" name="measureUnits" onClick={(e) => { handleInput(e); setOpen(!open) }}>Gr</button>
                            <button className="p-2 hover:bg-[--celeste] rounded-lg" value="Ml" name="measureUnits" onClick={(e) => { handleInput(e); setOpen(!open) }}>Ml</button>
                            <button className="p-2 hover:bg-[--celeste] rounded-lg" value="Cm3" name="measureUnits" onClick={(e) => { handleInput(e); setOpen(!open) }}>Cm3</button>
                        </div>
                    </div>
                }
            </div>
            {
                input.measureUnits &&
                
                <TextInput label="Peso o Medida"  name="measureValue" onChange={handleInput} palceHolder="Ingrese peso o cantidad" type="number" value={input.measureValue}/>
            }
        </div>

    )

}

export default SelectorMesure;