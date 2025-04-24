import { getToast } from '@/helpers/toastofy';



 function useDeleteProduct() {

  async  function deleteProduct(id:string){
        try {
            const response = await fetch(`/api/products/id/${id}`,{
                method:'DELETE'
            })

            const responseJson = await response.json()
            
            if(responseJson.status === 200){
                getToast('success', 'El producto se elimino', 3000)
            }else{
                getToast('error', 'No se logro eliminar el producto', 3000)
            }
            

        } catch (error) {
            console.log(error)
        }
    }


    return {
        deleteProduct
    }
}

export default useDeleteProduct