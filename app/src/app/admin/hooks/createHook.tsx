import { CategoryIF } from '@/app/intefaces/modelsIntefaces';
import { useCategoryStore } from '@/app/store/categoryStore';
import { getToast } from '@/helpers/toastofy';
import React, { useEffect, useState } from 'react';

interface InputState {
    name: string;
    description: string;
    price: number;
    image: string;
    categories: string[];
    parentId: null | string
    newCategory: string
    parentCategory: string
}

function useCreateHook() {
    const [input, setinput] = useState<InputState>({
        name: '',
        description: '',
        price: 0,
        image: '',
        categories: [],
        parentId: null,
        newCategory: '',
        parentCategory: ''
    });
    const [buildCategories, setBuildCategories] = useState<CategoryIF[]>([])

    const { categories } = useCategoryStore()

    function buildCategory(categories: CategoryIF[], categoriesId: string[]) {
        let rebuildCategories: CategoryIF[] = []
        for (const category of categoriesId) {
            const founded = categories.find((cat: CategoryIF) => cat.id == category)
            if (founded) rebuildCategories.push(founded)
            else {
                categories.forEach(ct => {
                    if (ct.subCategory) {
                        const result = buildCategory(ct.subCategory, [category])
                        rebuildCategories = [...rebuildCategories, ...result]
                    }
                })
            }
        }

        return rebuildCategories
    }

    function handleImage(url: string) {
        setinput(prev => ({ ...prev, image: url }))
    }


    function handleInput(e: React.ChangeEvent<HTMLInputElement> |
        React.ChangeEvent<HTMLSelectElement>
        | React.ChangeEvent<HTMLTextAreaElement>) {

        setinput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleProductParent(parentId: string | null) {

        if (parentId) {
            setinput({
                ...input,
                parentId: parentId
            })
        } else {
            setinput({
                ...input,
                parentId: null
            })
        }
    }

    function handleCategoriesInput(id: string) {
        const exist = [...input.categories].find(ct => ct == id)
        if (!exist) {
            setBuildCategories(buildCategory(categories, [...input.categories, id]))
            setinput({
                ...input,
                categories: [...input.categories, id]
            })
        }
    }

    function deleteCategory(id: string) {
        setinput({
            ...input,
            categories: input.categories.filter(cat => cat != id)
        })

        setBuildCategories(buildCategories.filter(cat => cat.id != id))

    }


    async function submit() {
        try {
            getToast('info', 'se esta creando el producto...', 3000)
            const newProduct = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input)
            })
            setinput({
                ...input,
                name: '',
                description: '',
                price: 0,
                image: '',
                categories: [],
            })
            const response = await newProduct.json()
            if (response.error) throw new Error(`no se logro crear el producto: ${response.error}`)

            getToast('success', 'producto creado con exito', 4000)
            getToast('loading', 'se esta creando el producto...', 3000)
            return { status: 201, response }
        } catch (error) {
            if (error instanceof Error) {

                console.log(error.message)
            }
            if (error instanceof Error)
                getToast('error', error.message, 4000)
            return 300
        }
    }


    //category methods

    function resetInput() {
        setinput(
            {
                name: '',
                description: '',
                price: 0,
                image: '',
                categories: [],
                parentId: null,
                newCategory: '',
                parentCategory: ''
            }
        )
        setBuildCategories([])
    }

    async function submitCategories() {
        try {
            const response = await fetch('/api/categories', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: input.newCategory,
                    parentId: buildCategories[0] ? buildCategories[0].id : null
                })

            })
            const responseJson = await response.json()
            if (responseJson.error) throw new Error(responseJson.error)
            getToast('success', 'categoria creada con exito', 4000)
            return { status: 201, response: responseJson }
        } catch (error) {
            if (error instanceof Error) {
                getToast('error', error.message, 4000)
            }
            return 300
        }
    }

    function handleCreategorySelected(id: string) {

        setinput({
            ...input,
            parentCategory: id
        })

        setBuildCategories(buildCategory(categories, [id]))

    }


    return {
        input,
        resetInput,
        handleInput,
        handleCategoriesInput,
        buildCategories,
        deleteCategory,
        handleProductParent,
        handleImage,
        submit,
        handleCreategorySelected,
        submitCategories
    }
}

export default useCreateHook