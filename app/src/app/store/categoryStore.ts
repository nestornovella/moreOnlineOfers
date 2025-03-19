import { create } from 'zustand'
import { CategoryIF } from '../intefaces/modelsIntefaces'



interface CategoryPropsInterface {
    categories: CategoryIF[]
    initialCharge:()=>Promise<number>
}

export const useCategoryStore = create<CategoryPropsInterface>((set) => ({
    categories: [], 
    
    initialCharge: async ()=>{
        try {
            const categories = await fetch('/api/categories')
            const data = await categories.json()
            set({categories:data})
            return 200
        } catch (error) {
            console.error(error)
            return 500
        }
    }
    }
)
)

