import { ProductIF } from "@/app/intefaces/modelsIntefaces"
import { useCartStore } from "@/app/store/cartStore"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { FaShoppingCart } from "react-icons/fa";

interface Props {
    product: ProductIF
}



function ProductCard({ product }: Props) {

    const { getCart } = useCartStore()
    const [quantity, setCuantity] = useState(0)
    const searchParams = useSearchParams()
    const sellerId = searchParams.get('seller') || ''

    useEffect(() => {
        const cart = getCart()[product.id]?.quantity
        if (cart) {
            setCuantity(cart)
        }
    }, [])

    const { id, name, price, image, measureUnits, measureValue } = product
    return (
        <Link href={`/detail/${id}/?seller=${sellerId}`}>
            <div style={{ fontFamily: "var(--font-roboto)" }} className="animate-card border rounded-xl p-2 text-center lg:text-start bg-white grid md:grid-cols-2  h-full relative">

                <div className="flex justify-center items-center p-2">
                    <Image className="size-[150px] object-cover" src={image ? image : ''} alt="" quality={100} width={1000} height={1000} />
                </div>
                <div className="flex justify-between  items-center flex-col lg:py-6  ">
                    <h2 className="font-bold min-h-5 text-sm md:text-sm  text-gray-500">{name[0].toUpperCase() + name.slice(1)}</h2>
                    <div className="p-2 text-xs md:text-sm  text-gray-500">
                        <p>toque el producto que desea agregar al carrito</p>
                    </div>
                    <div className=""><div className="bg-[black] text-white font-semibold py-1 px-7 -mx-4 rounded-lg w-fit relative top-4 -rotate-12">
                        <p className="text-xs">peso</p>
                        <h2>{`${measureValue + ' ' + measureUnits}`}</h2>
                    </div>
                        <div className="bg-[--verde] text-white font-semibold py-1 px-7 mx-4 rounded-lg w-fit pt-2 " >
                            <p className="text-xs">precio</p>
                            <h2>{'$ ' + price}</h2>
                        </div>
                        <div className="bg-black absolute -top-1 -left-1 font-semibold p-1 rounded text-xs animate-zoom-in flex gap-2 items-center ">
                            <FaShoppingCart className="text-white" />
                            <h2>{quantity}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </Link>

    )
}

export default ProductCard


