import { twMerge } from "tailwind-merge"

type props = {
    readonly title: string
    readonly children: React.ReactNode
    readonly titleStyles?: string
    readonly containerStyles?: string
}

export function ContainerWithDescription({title, children, titleStyles, containerStyles}: props){
    return (
        <div className="w-full">
            <p className={twMerge("font-bold", titleStyles)}>{title}</p>
            
            <div className={twMerge("flex flex-col bg-(--background-gray) p-3 rounded-xl gap-2 text-left", containerStyles)}>
                {children}
            </div>
        </div>
    )

}