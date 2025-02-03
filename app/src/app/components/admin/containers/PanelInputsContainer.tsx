

function PanelInputsContainer({children}:{children: React.ReactNode}){


    return (
        <div className="grid md:grid-cols-2 gap-4">
            {children}
        </div>
    )
}
export default PanelInputsContainer