import { create } from 'zustand'
import { ProductIF } from '../intefaces/modelsIntefaces'



interface PropIF {
    products: ProductIF[]
    initialCharge: (sellerId?: string) => Promise<number>
}

export const useProductStore = create<PropIF>((set) => {

    return {
        products: [],

        initialCharge: async (sellerId) => {
            try {   
                

                if (sellerId) {
                    const seller = await fetch(`/api/seller/${sellerId}`)
                    const sellerToJson = await seller.json() 

                  

                    const prod = await fetch('/api/products')
                    const productToJson = await prod.json() 

                    const productList = productToJson.map(pr => {
                        const porcent = sellerToJson.products.find(sellerPr => sellerPr.productId === pr.id).porcent
                        return {...pr, price: pr.price + ((pr.price * porcent) / 100)}
                    })
                   
                    set(() => {
                    return {
                        products: productList
                    }
                })
                }else{
                    const prod = await fetch('/api/products')
                    const productToJson = await prod.json()
                    set(()=>{
                        return {
                        products:productToJson
                    }
                    })
                    
                }


               
                return 200
            } catch (error) {
                console.error(error)
                return 500
            }
        }
    }
})