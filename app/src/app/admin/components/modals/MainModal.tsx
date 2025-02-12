import React, { useEffect, useState } from "react"


interface PropsIF {
    cb:null | (() => void) 
    children: React.ReactNode
    state: boolean
}

function MainModal({ children, state = false, cb = null }: PropsIF) {

    const [ ToogleOpen, setToogleOpen ] = useState(true);
    const className = 'flex fixed z-[100] w-screen h-screen bg-black/50 top-0 left-0 justify-center items-center'
    
    useEffect(() => {
        if (ToogleOpen) {
            document.body.classList.add("overflow-hidden"); // Bloquear scroll
        } else {
            document.body.classList.remove("overflow-hidden"); // Restaurar scroll
        }

        return () => {
            document.body.classList.remove("overflow-hidden"); // Limpieza al desmontar
        };
    }, [ToogleOpen]);

    return (
        <>  
            {
                !state ?
                    <div onClick={cb as ()=>void} className={className} >
                        {children}
                    </div >
                    :
                    ToogleOpen &&
                    <div onClick={()=>{setToogleOpen(prev => !prev)}} className={className} >
                        {children}
                    </div >
            }
        </>


    )
}

export default MainModal