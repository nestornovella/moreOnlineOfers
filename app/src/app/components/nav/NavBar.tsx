'use client'

import Image from "next/image"
import bag from '@/app/assets/bagLogo.png'
import { useCartStore } from "@/app/store/cartStore"
import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"



function Avatar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sellerId = searchParams.get('seller') || ''
  return (
    <div onClick={() => router.replace('/?seller=' + sellerId)} style={{ fontFamily: 'var(--font-roboto) ' }}>
      <div className="rounded-full bg-[--rosado] text-white p-3 size-[60px] text-center">
        <h2 className="text-[30px] font-bold ">Ca</h2>
      </div>
    </div>
  )
}


function Cart() {
  const { cart } = useCartStore()
  const [length, setLength] = useState(0)
  const router = useRouter()
  const searchParams = useSearchParams()
  const sellerId = searchParams.get('seller') || ''
  useEffect(() => {
    const cartLength = Object.keys(cart).length

    if (cartLength) {
      setLength(cartLength)
    } else {
      setLength(0)
    }
  }, [cart])

  return (
    <div onClick={() => router.push('/carrito/?seller=' + sellerId)} style={{ fontFamily: 'var(--font-roboto)' }} className="relative">
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

  return (
    <div className="fixed top-0 left-0 z-10 border-b-2 border-[--rosado] backdrop-blur-lg bg-black/50  h-[70px] flex w-full items-center p-4 justify-between">
      <div className="flex w-full items-center p-4 justify-between 2xl:px-72 md:px-20 px-1 py-5">
        <Suspense fallback={<div className="w-[50px] h-[50px] rounded-full bg-[--rosado] animate-pulse"></div>}>
          <Avatar />
        </Suspense>
        <Suspense fallback={<div className="w-[50px] h-[50px] rounded-full bg-[--rosado] animate-pulse"></div>}>
          <Cart />
        </Suspense>
      </div>
    </div>
  )
}

export default NavBar