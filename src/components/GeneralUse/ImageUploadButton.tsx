import { useRef } from "react";
import { ButtonImage } from "./ButtonImg";

function ImageUploadButton({callbackFuncion}: {readonly callbackFuncion: (file: File)=>void}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      callbackFuncion(file);
    }
  };

  return (
    <div>
      <ButtonImage
          iconURL="src\assets\img\image.png"
          buttonStyles="p-3 rounded-full bg-white min-w-10"
          iconStyles="w-8 h-8"
          onClick={handleButtonClick}
        />

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploadButton;