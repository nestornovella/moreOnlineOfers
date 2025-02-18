



function MainContainer({children}: {children: React.ReactNode}) {

    return (
        <div style={{ fontFamily: 'var(--font-opensans)'}} className="flex flex-col items-center justify-center w-full min-h-screen 2xl:px-72 md:px-32 px-1 py-5">
            {children}
        </div>
    )

}

export default MainContainer