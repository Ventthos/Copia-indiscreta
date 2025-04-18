import { twMerge } from "tailwind-merge"
import { IconInput } from "./IconInput"
import FilterPopover from "./FilterPopOver"


type props = {
    readonly title: string
    readonly children: React.ReactNode
    readonly containerStyles?: string
    readonly extraElements?: React.ReactNode
    readonly onSearchInput?: (event: React.ChangeEvent<HTMLInputElement>) => void
    readonly filters?: {value: number, name: string}[]
    readonly onFilterSelected?: (value: number) => void
}
//min-w-[16.25rem]
//border-r-(--background-gray)
//h-[calc(100vh-1rem)] md:h-[calc(100vh-2rem)]

export function List({title, children, containerStyles, extraElements, onSearchInput, filters, onFilterSelected}: props){
    return(
        <div className={twMerge("bg-white p-4 flex flex-col rounded-l-lg", containerStyles)}>
            <div className="flex flex-col">
                <div className="flex place-content-between gap-3">
                  <h1 className="text-2xl">{title}</h1>
                  {filters && <FilterPopover filters={filters} buttonStyles="text-sm" pageStyles="" onFilterSelected={onFilterSelected}/>}
                </div>
                <IconInput iconUrl="/src/assets/img/lupa.png" IconInputStyles="" onChange={onSearchInput}/>
            </div>
        
            <div className="flex flex-col overflow-y-auto mt-4 flex-1">
                {children}
            </div>
            {extraElements}
        </div>
    )
}