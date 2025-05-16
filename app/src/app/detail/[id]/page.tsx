"use client"

import Image from "next/image";
import TransitionPage from "../../components/containers/TransitionPage";
import { ProductIF } from "../../intefaces/modelsIntefaces";
import { useProductStore } from "../../store/productsStore";
import { useEffect, useState } from "react";
import useDetail from "./detail.hook";
import { useParams, useRouter } from "next/navigation";
import MainContainer from "../../components/containers/MainContainer";
import SelectCuantity from "./selectQuantity";
import { useCartStore } from "../../store/cartStore";
import { FaShoppingCart } from "react-icons/fa";

function Detail() {
    const { findProduct, product } = useDetail()
    const { products } = useProductStore()
    const { addToCart, getCart, cart } = useCartStore()

    const [cartLength, setCartLength] = useState(0)

    const router = useRouter()
    const { id } = useParams()
    useEffect(() => {
        findProduct(id as string)
    }, [products])

    useEffect(() => {
        document.body.style.background = 'white'
        window.scrollTo(0, 0)
        return () => {
            document.body.style.background = 'var(--background)'
        }
    }, [])

    useEffect(() => {
        if (product) {
            const length = getCart()[product.id]?.quantity || 0
            setCartLength(length)
        }
    }, [cart, product])

    function addProduct(cuantity: number) {
        if (product) {
            addToCart(product.id, product, cuantity)
        }
    }


    return (
        <MainContainer>
            <TransitionPage />
            <div style={{ fontFamily: "var(--font-roboto)" }} className=" mt-[100px] text-center md:text-start grid md:grid-cols-2 items-center gap-2">
                {product ? (
                    <div className="p-2 flex flex-col gap-2 ">
                        <div className="absolute z-[10] backdrop-blur-[20px] left-0 bg-black text-[--rosado] top-[80px] flex gap-2 text-center justify-center items-center w-fit m-auto  p-2">
                            <h2 className="font-bold text-2xl text-[--rosado] ">Precio</h2>
                            <h2 className='font-bold text-4xl text-white'>$ {product.price}</h2>
                        </div>
                        <div className="relative">
                            <Image
                                alt={product.name || "Producto"}
                                src={product.image || "/placeholder.png"}
                                width={1000}
                                height={1000}
                                className=" object-cover rounded-2xl"
                            />
                            <hr className="border my-2" />
                            <div className="text-gray-700 flex gap-2 text-xl  items-center">
                                <FaShoppingCart className="text-[--rosado]" />
                                <h2 className="text-sm text-gray-500 font-semibold">{cartLength}</h2>
                                <p className="text-xs text-gray-500">unidades en el carrito</p>
                            </div>
                            <div>
                                {
                                    product?.varieties?.length > 0 && (
                                        <p className="text-xs font-semibold text-[--rosado]">Variedades</p>
                                    )
                                }
                                <div className="flex gap-2">
                                    {
                                        
                                        product?.varieties?.length > 0 &&
                                        product.varieties.map(pr => {
                                            return <Variant router={router} key={pr.id} product={pr} />
                                        })
                                    }
                                    {

                                        product.parentId &&
                                        <Variant key={1} product={products.find(pr => pr.id === product.parentId) as ProductIF} router={router} />

                                    }
                                    {

                                        product.parentId &&
                                        products.find(pr => pr.id === product.parentId)?.varieties.filter(pr => pr.id !== product.id).map(p => {
                                            return <Variant key={p.id} product={p} router={router} />
                                        })

                                    }
                                </div>

                            </div>
                        </div>


                        <div className="text-[--rosado]">
                            <div className="text-sm flex gap-1 font-bold  w-fit md:w-full p-1 justify-center md:justify-start md:text-lg items-center m-auto">
                                <h2 className="text-gray-500 text-xl md:text-2xl font-bold ">{product.name}</h2>
                                <div className="flex gap-[1px] border px-[5px] py-[2px] rounded-lg">
                                    <p >{product?.measureValue}</p>
                                    <p>{product?.measureUnits}</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-[--rosado] text-sm">Descripcion del producto</p>
                        <p className="text-sm md:text-[20px] text-gray-500">{product.description}</p>

                    </div>
                ) : (
                    <p>Producto no encontrado</p>
                )}
                <div style={{ fontFamily: "var(--font-roboto)" }} className=" flex flex-col">

                    <div className="text-gray-500 flex flex-col gap-2">
                        <p className="text-sm font-semibold">cantidad:</p>
                        <SelectCuantity cb={addProduct} />
                    </div>
                    <div className="p-4 md:p-0 text-gray-500">
                        <p className="text-[--rosado]">Importante</p>
                        <p className="text-xs md:text-sm">todos los productos son de maxima calidad, cumplen con las normas alimenticias vigentes, si hay algun inconveniente comuniquese por whatsapp.
                            el mismo tiene cambio en la proxima entrega vigente.</p>
                    </div>
                </div>
            </div>
        </MainContainer>


    );
}

export default Detail


function Variant({ product, router }: { product: ProductIF, router }) {

    return (
        <div className="py-5">
            <div onClick={() => { router.replace(`/detail/${product.id}`) }} className="border p-2 my-2 rounded-xl">
                <Image className="size-[80px] object-cover" alt="" src={product.image || ''} width={400} height={400} quality={80} />

            </div>
        </div>
    )
}