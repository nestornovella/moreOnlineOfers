import { useCategoryStore } from '@/app/store/categoryStore';
import { getToast } from '@/helpers/toastofy';
import { useState } from 'react';


function useCategoriesHook() {
    
    const {categories} = useCategoryStore()
    

    async function deleteCategory(id: string) {
        // delete category
        try {
            

            getToast
        } catch (error) {
          if(error instanceof Error){
            console.log(error.message)
          }
        }
    }



    return {


    }
}

export default useCategoriesHook