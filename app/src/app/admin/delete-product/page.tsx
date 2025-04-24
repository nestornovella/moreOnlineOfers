'use client'
import MainContainer from "@/app/components/containers/MainContainer"
import DeleteProductModal from "./deleteProductModal"
import { useEffect } from "react"
import { useProductStore } from "@/app/store/productsStore"



function DeleteProductSection() {
  const { initialCharge, products } = useProductStore()

  useEffect(() => {
    
      initialCharge('ffd31bb8-cf61-40c5-a83c-859794800932')
    
  }, [])
  console.log(products)
  return (
    <MainContainer>
      <div className="w-full">
        <h2 className=" mt-[60px] text-[--celeste]  text-2xl p-2" style={{ fontFamily: 'var(--font-opensans)' }}>Eliminar producto</h2>
        <hr className="border-t-4 border-[--celeste] border-solid " />
      </div>
      <div>
        <DeleteProductModal />
      </div>
    </MainContainer>
  )
}

export default DeleteProductSection