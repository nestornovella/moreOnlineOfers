import { CategoryIF } from '@/app/intefaces/modelsIntefaces';
import { useCategoryStore } from '@/app/store/categoryStore';
import React, { useEffect, useState } from 'react';

interface InputState {
    name: string;
    description: string;
    price: number;
    image: string;
    categories: string[];
    parentId:null | string
}

function useCreateHook() {
    const [input, setinput] = useState<InputState>({
        name: '',
        description: '',
        price: 0,
        image: '',
        categories: [],
        parentId: null
    });
    const [buildCategories, setBuildCategories] = useState<CategoryIF[]>([])

    const { categories } = useCategoryStore()

    function buildCategory(categories: CategoryIF[], categoriesId: string[]) {
        let rebuildCategories: CategoryIF[] = []
        for (const category of categoriesId) {
            const founded = categories.find((cat: CategoryIF) => cat.id == category)
            if (founded) rebuildCategories.push(founded)
            else{
                categories.forEach(ct => {
                    if(ct.subCategory){
                        const result = buildCategory(ct.subCategory, [category])
                        rebuildCategories = [...rebuildCategories, ...result]
                    }
                })
            }
        }

        return rebuildCategories
    }

    function handleImage(url:string){
        setinput(prev => ({...prev, image:url}))
    }
    

    function handleInput(e: React.ChangeEvent<HTMLInputElement> |
        React.ChangeEvent<HTMLSelectElement>
        | React.ChangeEvent<HTMLTextAreaElement> ) {
           
        setinput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleProductParent(parentId: string | null){

        if(parentId){
            setinput({
                ...input,
                parentId: parentId
            })
        }else{
            setinput({
                ...input,
                parentId : null
            })
        }
    }

    function handleCategoriesInput(id:string) {
        const exist = [...input.categories].find( ct => ct == id)
        if(!exist){
            setBuildCategories(buildCategory(categories, [...input.categories, id]))
            setinput({
                ...input,
                categories: [...input.categories, id]
            })
        }
    }

    function deleteCategory(id:string){
        setinput({
            ...input,
            categories: input.categories.filter(cat => cat != id)
        })

        setBuildCategories(buildCategories.filter(cat => cat.id != id))

    }

    return {
        input,
        handleInput,
        handleCategoriesInput,
        buildCategories,
        deleteCategory,
        handleProductParent,
        handleImage
    }
}

export default useCreateHook