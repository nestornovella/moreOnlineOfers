import { FaShoppingCart } from "react-icons/fa"
import loading from '@/app/assets/loading.png'
import Image from "next/image" 

function LoadingCard() {

    return (
        <div>
            <div style={{ fontFamily: "var(--font-roboto)" }} className="animate-pulse border  justify-center  rounded-xl p-2 text-center lg:text-start bg-white grid lg:grid-cols-2 gap-2 relative">
                <div className="bg-black absolute -top-1 -left-1 font-semibold p-1 rounded text-xs animate-zoom-in flex gap-2 items-center ">
                    <FaShoppingCart className="text-white" />
                    <h2>0</h2>
                </div>

                <div className="flex justify-center items-center p-2 size-[150px] bg-gray-200">
                    <Image className="animate-pulse" src={loading} alt="" quality={100} width={500} height={500} />
                </div>

                <div className="bg-gray-200 w-full h-[40px]">

                </div>
                <div className="bg-gray-200 w-full h-[20px]">

                </div>
                <div className="flex justify-between  items-center flex-col lg:py-6  ">

                    <div className=""><div className="bg-[black] text-white font-semibold py-1 px-7 -mx-4 rounded-lg h-[40px] pt-2 w-[80px] relative top-4 gap-2 flex flex-col -rotate-12">
                        <div className="bg-white w-[30px] h-[8px]" >

                        </div>
                        <div className="bg-white w-[40px] h-[12px]">

                        </div>
                    </div>
                        <div className="bg-[--verde] text-white font-semibold py-1 px-7 mx-4 rounded-lg h-[40px] pt-2 w-[80px] flex gap-1 flex-col" >
                            <div className="bg-white w-[30px] h-[8px]" >

                            </div>
                            <div className="bg-white w-[40px] h-[12px]">

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

function LoadingSection() {

    return (
        <div>
            <div className="w-full text-center bg-[--verde] p-1 mb-2">Loading...</div>
            <div className="grid grid-cols-2 md:grid-cols-3  gap-2">
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
            </div>
        </div>

    )
}
export default LoadingSection
