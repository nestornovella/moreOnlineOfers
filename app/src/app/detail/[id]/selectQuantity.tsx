import React, { useRef } from "react";


interface Props {
  cb: (cuantity: number) => void
}

function SelectCuantity({ cb }: Props) {

  function buildButtons() {
    return Array.from({ length: 12 }, (_, i) => (
      <button onClick={() => cb(i + 1)} key={i} value={i + 1} className="border p-1 text-md bg-[white] active:bg-[--rosado] active:text-white font-semibold">
        {(i + 1)}
      </button>
    ));
  }


  const ref = useRef<HTMLInputElement>(null)

  return (
    <div style={{ fontFamily: "var(--font-roboto)" }} className="w-fit m-auto flex flex-col ">
      <button className="text-sm  p-1">selecciona la cantidad de productos que dese agregar al carrito</button>
      <div className=" h-[280px] overflow-auto grid grid-cols-3 gap-1 p-1 ">
        {buildButtons()}
      </div>
      <p className="text-sm text-center text-[--rosado] mt-4">si desea una cantidad superior ingresela aqui:</p>
      <div className="flex justify-center gap-2 items-center border p-2 rounded border-[--rosado] mb-2">
        <div className=" w-full px-4 py-2">
          <input ref={ref} placeholder="ingrese la cantidad deseada" className="border rounded my-2 p-1 text-sm w-[100%]" type="number" />
        </div>
        <div>
          <button onClick={
            () => {
              cb(Number(ref.current?.value) || 0);
              if (ref.current) {
                ref.current.value = ''
              }
            }} className="bg-red-400 p-1 rounded text-white font-semibold">Agregar</button>
        </div>
      </div>


    </div>
  );
}

export default SelectCuantity;