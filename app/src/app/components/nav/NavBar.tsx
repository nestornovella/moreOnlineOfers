'use client'

import Image from "next/image"
import bag from '@/app/assets/bagLogo.png'
import { ProductIF } from "@/app/intefaces/modelsIntefaces"
import { useProductStore } from "@/app/store/productsStore"
import { useCartStore } from "@/app/store/cartStore"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"



function Avatar() {
  const router = useRouter()
  return (
    <div onClick={() => router.replace('/')} style={{ fontFamily: 'var(--font-roboto) ' }}>
      <div className="rounded-full bg-[--rosado] text-white p-3 size-[60px] text-center">
        <h2 className="text-[30px] font-bold ">Ca</h2>
      </div>
    </div>
  )
}


function Cart({ products }: { products: ProductIF[] }) {
  const { getCart, cart } = useCartStore()
  const [length, setLength] = useState(0)
  const router = useRouter()
  useEffect(() => {
    const cartLength = Object.keys(cart).length
    
    if (cartLength) {
      setLength(cartLength)
    }else{
      setLength(0)
    }
  }, [cart])
  console.log('NAV ->', cart)
  return (
    <div onClick={() => router.replace('/carrito')} style={{ fontFamily: 'var(--font-roboto)' }} className="relative">
      <Image className="size-[50px]" alt="" src={bag} width={500} height={500} />
      {
        length > 0 &&
        <div className="bg-[--rosado] rounded-full  p-1 absolute top-8 left-10 size-[22px] text-center">
          <p className="text-white text-xs font-bold">{length}</p>
        </div>
      }

    </div>
  )
}

function NavBar() {
  const { products } = useProductStore()
  return (
    <div className="fixed top-0 left-0 z-10 border-b-2 border-[--rosado] backdrop-blur-lg bg-black/50  h-[70px] flex w-full items-center p-4 justify-between">
      <div className="flex w-full items-center p-4 justify-between 2xl:px-72 md:px-20 px-1 py-5">
        <Avatar />
        <Cart products={products} />
      </div>
    </div>
  )
}

export default NavBar