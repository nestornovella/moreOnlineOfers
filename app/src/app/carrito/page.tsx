'use client'

import { ProductIF } from "@/app/intefaces/modelsIntefaces"
import { GetCart, useCartStore } from "@/app/store/cartStore"
import Image from "next/image"
import { useEffect, useState } from "react"
import { RiDeleteBin6Line } from "react-icons/ri"
import Styles from '@/app/carrito/carrito.module.css'
import cartImage from '@/app/assets/sinProducts.png'
import MainContainer from "../components/containers/MainContainer"
import { ImWhatsapp } from "react-icons/im"

function Carrito() {
    const { getCart, cart, deleteProduct, addOne, restOne } = useCartStore()

    const [cartState, setCartState] = useState<any | null>(null)

    useEffect(() => {
        document.body.style.background = 'white'
        return () => {
            document.body.style.background = 'var(--background)'
        }
    }, [])

    useEffect(() => {
        setCartState(Object.values(getCart()))
    }, [cart])
    console.log('cart', cartState)
    return (

        <div style={{ fontFamily: 'var(--font-roboto)' }} className=" pt-[100px] min-h-screen 2xl:px-72 md:px-20 px-1 py-5">
            <ul>
                {
                    cartState?.map((el: { product: ProductIF, quantity: number, subTotal:number }, i: number) => {
                        return <li style={{ animationDelay: `${i * .2}s` }} className={`border `} key={el.product.id}>
                            <div className={`p-2 flex w-full justify-between items-center gap-2 ${Styles.cartItem}`}>
                                <div className="my-3">
                                    <Image className="size-[70px] object-cover" src={el.product.image || ''} alt="" width={200} height={200} quality={80} />
                                </div>
                                <div className="w-[25%] ">
                                    <p className=" text-sm text-gray-500">{el.product.name}</p>
                                </div>
                                <div className="flex flex-col  justify-center items-center">
                                    <div className="flex flex-col justify-center items-center text-center mb-2">
                                        <p className="text-sm text-gray-500 ">cantidad</p>
                                        <p className="text-[--rosado] font-semibold">{el.quantity}</p>
                                    </div>
                                    <div className="flex gap-1">
                                        <button onClick={() => { restOne(el.product.id) }} className="border size-[35px] text-sm rounded-full  text-white active:bg-[--rosado] active:text-white bg-black">-</button>
                                        <button onClick={() => { addOne(el.product.id) }} className="border size-[35px] text-sm rounded-full text-white  active:bg-[--rosado] active:text-white bg-black">+</button>
                                    </div>
                                </div>

                                <div>
                                    <button onClick={() => { deleteProduct(el.product.id) }} >{<RiDeleteBin6Line className="size-[40px] text-red-600 active:text-[--verde]" />}</button>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <h2 className="text-sm font-semibold text-gray-500">sub total:</h2>
                                <h2>{el.subTotal}</h2>
                            </div>
                        </li>
                    })
                }
                {
                    !cartState?.length &&
                    <div className="w-full h-[calc(100vh-120px)] flex flex-col items-center justify-center gap-10">
                        <div className="border p-4 rounded-xl bg-[--verde] text-white">
                            <h2 className="font-bold text-2xl">No hay productos en el carrito</h2>
                        </div>
                        <Image className="" src={cartImage} alt="" width={500} height={450} quality={100} />
                    </div>
                }

                <div className="">
                    <h2 className="text-gray-500 font-semibold text-xl p-2">Total:</h2>
                </div>

                <div className="flex items-center justify-center mt-4">
                    <button className="p-3 border-none rounded-full bg-[#25D366] text-white text-lg font-medium flex items-center justify-center gap-2 shadow-md hover:bg-[#1ebe5d] transition-all duration-300">
                        <ImWhatsapp className="text-2xl" /> Enviar Pedido
                    </button>
                </div>

            </ul>
        </div>


    )
}

export default Carrito