// components/ui/FloralBorder.tsx
import Image from "next/image";
import React from "react";

interface FloralBorderProps {
  imageUrl: string;
  altText?: string;
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
  className?: string; // For custom sizing or other styles
}

const FloralBorder: React.FC<FloralBorderProps> = ({
  imageUrl,
  altText = "Floral decoration",
  position,
  className,
}) => {
  let positionClasses = "absolute z-0";
  switch (position) {
    case "top-left":
      positionClasses += " top-0 left-0";
      break;
    case "top-right":
      positionClasses += " top-0 right-0";
      break;
    case "bottom-left":
      positionClasses += " bottom-0 left-0";
      break;
    case "bottom-right":
      positionClasses += " bottom-0 right-0";
      break;
    case "top-center":
      positionClasses += " top-0 left-1/2 transform -translate-x-1/2";
      break;
    case "bottom-center":
      positionClasses += " bottom-0 left-1/2 transform -translate-x-1/2";
      break;
  }

  return (
    <div
      className={`${positionClasses} ${
        className || "w-32 h-32 md:w-48 md:h-48"
      }`}
    >
      {" "}
      {/* Default sizing */}
      <Image src={imageUrl} alt={altText} layout="fill" objectFit="contain" />
    </div>
  );
};

export default FloralBorder;
