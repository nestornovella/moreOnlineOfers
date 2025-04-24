import { getToast } from '@/helpers/toastofy';
import { useState } from 'react';

interface InputState {
    name: string;
    description: string;
    price: number;
    image: string;
    categories: string[];

}

function useUpdateProduct() {


    const [input, setinput] = useState<InputState>({
        name: '',
        description: '',
        price: 0,
        image: '',
        categories: [],
    });
    function handleImage(url: string) {
        setinput(prev => ({ ...prev, image: url }))
    }
    async function findProduct(id: string) {
        try {
            const response = await fetch(`/api/products/id/${id}`, {
                method: 'GET'
            })
            const product = await response.json()
            setinput(product)
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
            }
            if (error instanceof Error)
                getToast('error', error.message, 4000)
            return 300
        }
    }
    function handleInput(e: React.ChangeEvent<HTMLInputElement> |
        React.ChangeEvent<HTMLSelectElement>
        | React.ChangeEvent<HTMLTextAreaElement>) {

        setinput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    async function submit() {
        try {
            getToast('info', 'se esta actualizando el producto...', 3000)
            const newProduct = await fetch('/api/products', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input)
            })
            
            const response = await newProduct.json()
            if (response.error) throw new Error(`no se logro crear el producto: ${response.error}`)
            getToast('info', 'se esta guardando el producto...', 3000)
            getToast('success', 'producto modificado con exito', 4000)
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



    return {
        input,
        findProduct,
        handleImage,
        handleInput,
        submit


    }
}

export default useUpdateProduct