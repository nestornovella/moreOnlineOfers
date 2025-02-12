import {create} from 'zustand'
import { ProductIF } from '../intefaces/modelsIntefaces'

interface PropIF{
    products:ProductIF[]
    initialCharge:()=> Promise<number>
}

export const useProductStore = create<PropIF>((set)=> {
    return {
        products:[],

        initialCharge:async() =>{
            try {
                const prod = await fetch('/api/products')
                const productToJson = await prod.json()
                set(()=>{
                    return {
                        products: productToJson
                    }
                })
                return 200
            } catch (error) {
                return 500
            }
        }
    }
})