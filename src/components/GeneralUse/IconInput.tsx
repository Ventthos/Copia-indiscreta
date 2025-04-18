import { twMerge } from 'tailwind-merge';

type Props = {
    readonly iconUrl: string,
    readonly inputType?: "text" | "email" | "password" | "number" | "date" | "datetime" | "checkbox" | "radio" | "tel" | "url",
    readonly placeholder?: string
    readonly inputId?: string,
    readonly inputName?: string,
    readonly value?: string
    readonly iconStyles?: string,
    readonly IconInputStyles?: string
    readonly onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}


export function IconInput({iconUrl, inputType="text", placeholder, inputId, inputName, value, iconStyles, IconInputStyles, onChange}: Props){
    return(
        <div className={twMerge("flex bg-(--background-gray) p-1 gap-2 rounded-3xl items-center", IconInputStyles)}>
            <div className='p-2.75 bg-white rounded-full'>
                <img src={iconUrl} alt="" className={twMerge("w-4 h-4", iconStyles)} />
            </div>
            
            <input type={inputType} className=" w-full focus:outline-none text-sm placeholder:text-(--accent-gray)" placeholder={placeholder}
            id={inputId} name={inputName} value={value} onChange={onChange}/>
        </div>
    )
    
}