import { CategoryIF } from "@/app/intefaces/modelsIntefaces";
import { useEffect, useRef, useState } from "react";
import { TiArrowUnsorted } from "react-icons/ti";



interface PropsIF {
  categories: CategoryIF[],
  selected: CategoryIF[] | null
  callBack: (e: any) => void
  backCategory: CategoryIF,
  resetCategories: ()=> void
}


function SelectMenu({ categories, selected, backCategory, callBack, resetCategories }: PropsIF) {
  const [Open, setOpen] = useState(false);

  function handleOpenMenu() {
    setOpen((prev) => !prev)
  }




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

  return (
    <div className="min-h-[50px]" ref={menuRef}>
      <div className="border border-[--celeste] bg-[--celeste] text-black font-semibold flex items-center p-1 text-xl rounded w-full">
        <button onClick={handleOpenMenu} className="flex gap-2">
          <p>Seleccionar categoria</p>
        </button>
          <TiArrowUnsorted />
      </div>
      <div className={`min-h-[10px] border w-full ${!Open && 'hidden'}`}>
        {
          selected ?
            <div className="flex flex-col">
              {
                  <div className="flex flex-col">
                    {
                      selected.map((category) => (
                        <button value={category.id} onClick={callBack} key={category.id} className="p-2 hover:bg-[#333] cursor-pointer text-start" >
                          {category.name}
                        </button>
                      ))
                    }{
                      backCategory &&
                      <button value={backCategory.id} onClick={callBack} key={backCategory.id} className="p-2 hover:bg-[#333] cursor-pointer text-start" >
                        {'volver a ' + backCategory.name}
                      </button>
                    }
                  </div>

              }
              {
                
                <button onClick={resetCategories}  key={1} className="p-2 hover:bg-[#333] text-start cursor-pointer" >
                  {'menu Principal'}
                </button>
              }
            </div>
            :
            <div className="flex flex-col">
              {
                !categories.length ?
                  <div className="p-2 hover:bg-[#333] cursor-pointer">
                    Cargando...
                  </div>
                  :
                  categories.map((category) => (
                    <button onClick={callBack} value={category.id} key={category.id} className="p-2 hover:bg-[#333] text-start cursor-pointer" >
                      {category.name}
                    </button>
                  ))
              }
              
            </div>
        }
      </div>
    </div>
  )
}

export default SelectMenu 