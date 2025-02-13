


function TextArea({ label, palceHolder, value, name, onChange }) {

    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-sm text-white font-semibold">{label}</label>
            <textarea className="text-sm p-1 bg-[--background] text-white border border-[--celeste] rounded w-full py-2 md:py-1" placeholder={palceHolder} onChange={onChange} value={value} name={name} rows={5} />
        </div>
    )
}

export default TextArea