import {useRef, useState } from "react"
import { twMerge } from "tailwind-merge"

type props = {
    readonly children: React.ReactNode
    readonly windowStyles?: string
    readonly closeFunction?: () => void
}

export function DraggableWindow({children, windowStyles, closeFunction}: props){
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [dragging, setDragging] = useState(false);
    const offset = useRef({ x: 0, y: 0 });
  
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      setDragging(true);
      offset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    };
  
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!dragging) return;
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    };
  
    const handleMouseUp = () => {
      setDragging(false);
    };
  
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];
      offset.current = {
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      };
      setDragging(true);
    };
  
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
      if (!dragging) return;
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - offset.current.x,
        y: touch.clientY - offset.current.y,
      });
    };
  
    const handleTouchEnd = () => {
      setDragging(false);
    };
  
    return (
      <div
        className={twMerge("fixed z-150 w-64 bg-white border shadow-lg rounded", windowStyles)}
        style={{ top: position.y, left: position.x }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="cursor-move bg-gray-200 px-4 py-2 rounded-t select-none flex justify-between items-center"
        >
          <img src="src/assets/img/drag-handle.png" className="w-7 h-4" alt="drag" draggable={false}/>
          {
            closeFunction && <button className="bg-[#dc2c2c] py-0.75 px-2 rounded-md text-white hover:bg-[#e35656] active:bg-[#ee9696]" onClick={closeFunction}>Cerrar</button>
          }
          
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    );
  };