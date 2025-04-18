import { twMerge } from "tailwind-merge"

type Props = {
    readonly imgRoute: string,
    readonly text: string
    readonly link?: string,
    readonly active?: boolean
}

export function NavBarItem({imgRoute, text, link, active = false}: Props){
    return(
        <a href={link} className={twMerge("flex justify-centers items-center p-3 gap-2 hover:bg-(--mainColor) transition duration-300", `${active && "bg-(--mainColor)"}`)}>
                <img src={imgRoute} alt={`${text} icon`}  className="w-9"/>
                <p className="font-bold text-lg text-white">{text}</p>
        </a>
    )
}