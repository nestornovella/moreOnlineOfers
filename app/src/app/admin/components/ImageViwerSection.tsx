import Image from "next/image"


function ImageViewerSection({input}){

    return (
        <div className="flex p-5 justify-center">
            <Image className="size-full max-w-[500px] rounded-xl" alt="image" quality={100} width={300} height={300} src={`${!input.image ? "https://previews.123rf.com/images/aprillrain/aprillrain2301/aprillrain230101759/197036386-ilustraci%C3%B3n-colorida-de-la-imagen-gr%C3%A1fica-de-dibujos-animados-de-la-c%C3%A1mara-ilustraci%C3%B3n-de-alta.jpg" : input.image}`}/>
        </div>
    )
}

export default ImageViewerSection