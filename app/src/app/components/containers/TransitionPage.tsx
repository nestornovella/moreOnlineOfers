

function TransitionPage() {
    return (
        <div>
            <div className="w-screen h-screen bg-blue-400  fixed top-0 z-[1000] animate-transition1 right-0
            ">

            </div>
            <div className="w-screen h-screen bg-green-300  fixed top-0 z-[999]  animate-transition2  right-0 "></div>
        </div>
    );
}

export default TransitionPage;