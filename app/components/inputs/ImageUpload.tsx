"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";

declare global {
  var cloudinary: any;
}

const uploadPreset = "eypkktty";

interface ImageUploadProps {
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, onRemove, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-6 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div
              onClick={(e) => e.stopPropagation()}
                className="
              absolute inset-0 w-full h-full"
              >
                {onRemove && (
                  <button className="absolute top-0 right-0 p-1 z-[10] bg-slate-50 rounded" onClick={onRemove}>
                    <IoMdClose size={16} />
                  </button>
                )}
                <Image fill style={{ objectFit: "cover" }} src={value} alt="House" />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
