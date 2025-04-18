import { twMerge } from "tailwind-merge";

type props = {
    readonly sender: string;
    readonly direction: "incoming" | "outgoing";
    readonly type: "image" | "text";
    readonly text?: string;
    readonly imageUrl?: string;
    readonly bubbleStyles?: string;
}

export function ChatBubble({sender,direction, type, text, imageUrl, bubbleStyles}: props) {
  return (
    <div className={twMerge(`bg-white p-3 rounded-md relative after:absolute after:w-0 after:h-0 after:top-0 after:border-[16px] after:border-solid after:border-t-white after:border-r-transparent after:border-b-transparent after:border-l-transparent ${direction === "incoming" ? "after:left-[-14px]" : "after:right-[-14px]"}`, bubbleStyles)}>
      <p className="font-bold">{sender}</p>

      {/* Dependiendo del tipo de mensaje se renderiza un p o un image */}
      {
        type === "text" ? 
        <p className="text-left">{text}</p>
        :
        <img src={imageUrl} alt="Mensaje" className="max-h-100 "/>
      }
    </div>
  );
}