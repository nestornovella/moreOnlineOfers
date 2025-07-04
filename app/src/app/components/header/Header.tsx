import Image from "next/image";
import logo from "@/app/assets/logo.svg"

function Header() {

    //const textClass = "opacity-0 animate-become-left  text-[70px] md:text-[100px] xl:text-[140px] xl:text-center w-full  font-bold bg-gradient-to-r from-sky-400 to-green-500 bg-clip-text text-transparent"

    return (
        <div style={{ fontFamily: "var(--font-roboto)" }} className="mt-20 text-white text-center flex flex-col flex-wrap md:flex-row w-full font-bold gap-0 px-5 p-0  md:p-0 justify-center items-center ">
            <Image className="animate-fade-in md:max-w-[700px]" alt="" src={logo} width={1000} height={800} quality={100}/>
            {/* <h2 className={textClass}>Mas</h2>
            <h2 className={textClass}>Ofertas</h2>
            <h2 className={textClass}>Online.com</h2>
            <div className="flex justify-center w-full">
                <div className=" flex items-center gap-2 text-center justify-center p-1 rounded-xl m-[20px] bg-gradient-to-r from-[#003cff] to-[#17eb88] animate-become-right opacity-0">
                    <TiThumbsOk className="size-[50px] xl:text-[100px] text-[#f5f2f2] " />
                    <h2 className="   text-2xl xl:text-[40px] font-bold  ">
                        Envíos Gratis
                    </h2>
                </div>
            </div> */}


        </div>
    );
}

export default Header;