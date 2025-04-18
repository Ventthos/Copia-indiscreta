import { twMerge } from "tailwind-merge";

type Props = {
  readonly iconURL: string;
  readonly onClick?: () => void;
  readonly text?: string;
  readonly iconOrientation?: "left" | "right";
  readonly buttonStyles?: string;
  readonly iconStyles?: string;
  readonly textStyles?: string;
};

export function ButtonImage({
  iconURL,
  onClick,
  text,
  iconOrientation = "left",
  buttonStyles,
  iconStyles,
  textStyles,
}: Props) {
  return (
    <button
      className={twMerge(
        `flex items-center gap-1 bg-(--mainColor) rounded-2xl px-4 hover:bg-(--mainColorLighten) active:bg-(--mainColorLighter) transition:bg duration-300
            ${
                iconOrientation === "right" ? "flex-row-reverse" : "flex-row"
            }`,
        buttonStyles
      )}
      onClick={onClick}
    >
      <img
        src={iconURL}
        alt=""
        className={twMerge("w-3.5 h-3.5", iconStyles)}
      />
      {text && <p className={twMerge("text-sm", textStyles)}>{text}</p>}
    </button>
  );
}
