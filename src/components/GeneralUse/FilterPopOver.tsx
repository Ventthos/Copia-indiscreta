import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type props = {
  readonly filters: {value:number, name:string}[];
  readonly onFilterSelected?: (value:number)=>void
  readonly buttonStyles?: string;
  readonly pageStyles?: string;
}

export default function FilterPopover({filters, onFilterSelected, buttonStyles, pageStyles}: props) {
  const [open, setOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(0)
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Usado para ponerle el evento de que si da clic afuera, pues se quite la pantalla
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        className={twMerge("px-4 py-1 bg-(--mainColor) text-white rounded-lg  hover:bg-(--mainColorLighten) active:bg-(--mainColorLighter) transition-bg duration-300", buttonStyles)}
      >
        Filtros
      </button>

      {open && (
        <div
        ref={popoverRef}
        className={twMerge(`
          absolute 
          top-full mt-2 left-1/2 -translate-x-1/2 
          sm:top-0 sm:left-full sm:ml-2 sm:mt-0 sm:translate-x-0
          w-64 p-4 bg-white shadow-xl rounded-2xl border border-gray-200 z-50
        `, pageStyles)}
      >
          <h3 className="text-lg font-semibold mb-2">Filtros</h3>
          <div className="flex flex-col gap-2">
            {
                filters.map((filter) => 
                    <div key={filter.value}>
                        <input type="radio" name="selectedFilter" id={filter.name} value={filter.value} className=""  title={filter.name}
                        checked={currentValue === filter.value} onChange={() => {
                            setCurrentValue(filter.value)
                            if(onFilterSelected) onFilterSelected(filter.value)
                            }} />
                        <label htmlFor={filter.name} className="text-sm">{filter.name}</label>
                    </div>
                    
               )
            }
          </div>
        </div>
      )}
    </div>
  );
}