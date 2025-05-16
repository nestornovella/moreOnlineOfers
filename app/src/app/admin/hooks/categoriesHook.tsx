import { CategoryIF } from '@/app/intefaces/modelsIntefaces';
import { useCategoryStore } from '@/app/store/categoryStore';
import { getToast } from '@/helpers/toastofy';
import { useState } from 'react';


function useCategoriesHook() {

  const { categories, initialCharge } = useCategoryStore()
  const [fondedCategory, setFondedCategory] = useState<CategoryIF[]>([])


  function findCategory(categories: CategoryIF[], name: string): CategoryIF[] {

    let fc: CategoryIF[] = []
    for (const category of categories) {
      if (category.name.toLowerCase().includes(name.toLowerCase()))
        fc.push(category)

      if (category.subCategory) {
        fc = [...fc, ...findCategory(category.subCategory, name)]
      }

    }
    return fc

  }

  function findCategoryByName(name: string) {

    const founded = findCategory(categories, name)
    setFondedCategory(founded)
  }

  async function deleteCategory(id: string) {
    // delete category
    try {
      const response = await fetch('/api/categories/id/' + id,{
        method:'DELETE'
      })
      console.log(id, "esta es la id")
      const resToJson = await response.json()

      if(resToJson.error)throw new Error(resToJson.error)
      
      getToast('success', 'categoria eliminada', 3000)
      initialCharge()
      setFondedCategory(fondedCategory.filter(ct => ct.id != id))
    } catch (error) {
      if (error instanceof Error) {
        getToast('error', "no se pudo eliminar la categoria", 3000)
      }
    }
  }



  return {
    fondedCategory,
    findCategoryByName,
    deleteCategory

  }
}

export default useCategoriesHook