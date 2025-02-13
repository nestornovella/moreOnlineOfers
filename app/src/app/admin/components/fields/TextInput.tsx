

interface props{
    label: string
    type: string
    palceHolder: string
    value: string | number
    name: string
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void
}


function TextInput({label, type, palceHolder, value, name, onChange}:props){   
    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-sm text-white font-semibold">{label}</label>
            <input className="text-sm p-1 bg-[--background] text-white border border-[--celeste] rounded w-full py-2 md:py-1" placeholder={palceHolder} onChange={onChange} value={value} name={name} type={type || "text"} />
        </div>
    )
}

export default TextInput