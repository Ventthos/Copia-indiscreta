import { twMerge } from "tailwind-merge"

type props = {
    readonly title: string
    readonly onClick?: () => void
    readonly styles?: string
}

export function GreenButton({title, onClick, styles}: props){
    return(
        <button className={twMerge("bg-(--mainColor) px-6 py-2 mt-3 rounded-md self-end text-white hover:bg-(--mainColorLighten) active:bg-(--mainColorLighter) transition-bg duration-300", styles)} onClick={onClick}>
            {title}
        </button>
    )

}