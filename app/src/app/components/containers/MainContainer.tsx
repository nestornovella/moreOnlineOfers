



function MainContainer({children}: {children: React.ReactNode}) {

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen 2xl:px-36 md:px-14 px-5 py-5">
            {children}
        </div>
    )

}

export default MainContainer