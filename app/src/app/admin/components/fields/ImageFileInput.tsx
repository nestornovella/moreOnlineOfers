import React from "react"
import useCloudinary from "../../hooks/cloudinaryHook"




function ImageFileInput({ cb }: { cb: (url: string) => void }) {

    const { uploadToCloudinary } = useCloudinary()

    async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        const url = await uploadToCloudinary(file)
        if (url) {
            cb(url)
            e.target.value = ''
        }
    }

    return (
        <div className="flex flex-col gap-1 w-full">
            <label className="text-sm text-white font-semibold">Cargar Imagen</label>
            <input
                onChange={handleFile}
                type="file"
                className="file:bg-[--background] text-gray-400 font-semibold file:border file:border-[--celeste] file:text-[--celeste] file:font-semibold file:rounded file:py-2 file:px-4 file:cursor-pointer file:hover:opacity-90 file:transition-all bg-transparent text-sm w-full"
            />
        </div>
    )
}

export default ImageFileInput