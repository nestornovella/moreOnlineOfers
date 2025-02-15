import { useCategoryStore } from "@/app/store/categoryStore"
import { useEffect, useState } from "react"
import SelectMenu from "./SelectMenu"
import { MdDeleteOutline } from "react-icons/md";
import { CategoryIF } from "@/app/intefaces/modelsIntefaces";



function findSubCategories(categories:CategoryIF[], categoryId: string) {

    const category = categories.find((cat: any) => cat.id == categoryId)
    if (category) return category

    for (const cat of categories) {
        if (cat.subCategory.length) {
            return findSubCategories(cat.subCategory, categoryId)
        }
    }
    return null
}

function Select({buildCategories, handleCategoriesInput, deleteCategory}) {
    const { categories } = useCategoryStore()
    

    const [selected, setSelected] = useState<any[] | null>(null);
    const [backCategory, setBackCategory] = useState<any | null>(null);


    

    function handleCategories(e: React.MouseEvent<HTMLButtonElement>) {

        const target = e.target as HTMLButtonElement
        
        handleCategoriesInput(target.value)

        if (target.value == 'main') {
            setSelected(null)
            return
        }
        const result = findSubCategories(categories, target.value)
        if (result) {
            setSelected(result.subCategory)
            setBackCategory(result.parent)
        }

    }

    function resetCategories() {
        setSelected(null)
    }


    return (
        <div className="min-h-[100px]">
            
            <div className="text-[--celeste] flex justify-start gap-4 p-5">
                <SelectMenu categories={categories} selected={selected} resetCategories={resetCategories} callBack={handleCategories} backCategory={backCategory} />
            </div>
            <div className="text-[--celeste] flex flex-wrap justify-center gap-2">
                {
                    buildCategories?.map(cat =>{
                        return <button onClick={(e)=> {deleteCategory(e.currentTarget.value)}} key={cat.id} className="border p-2 rounded flex items-center gap-1" value={cat.id}>{cat.name} <MdDeleteOutline className="border text-black hover:bg-blue-500 size-7 rounded bg-[--celeste]"/></button>
                    })
                }
            </div>
        </div>

    )
}

export default Select