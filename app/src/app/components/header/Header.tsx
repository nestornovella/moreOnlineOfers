import Image from "next/image";
import banner from '@/app/assets/banner.png'

function Header() {
    return ( 
        <div className="text-white flex flex-col gap-2 p-5 my-10 md:p-0">
            <Image className="animate-fade-in md:max-w-[700px]" alt="" src={banner} width={1000} height={800} quality={100}/>
            
        </div>
     );
}

export default Header;