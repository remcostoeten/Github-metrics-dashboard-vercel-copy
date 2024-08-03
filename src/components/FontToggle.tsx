import React, { useState, useEffect } from "react";
import { Inter, Noto_Sans_JP } from "next/font/google";
import { toast } from "sonner";

const inter = Inter({ subsets: ["latin"] });
const noto = Noto_Sans_JP({ subsets: ["latin"] });

interface FontSwitcherProps {
  onFontChange: (fontClass: string) => void;
}

const FontSwitcher: React.FC<FontSwitcherProps> = ({ onFontChange }) => {
  const [currentFont, setCurrentFont] = useState("noto");

  const toggleFont = () => {
    const fonts = ["noto", "inter"];
    const currentIndex = fonts.indexOf(currentFont);
    const nextFont = fonts[(currentIndex + 1) % fonts.length];
    setCurrentFont(nextFont);
    toast(`Active font: ${nextFont}`);
  };

  useEffect(() => {
    onFontChange(getFontClass());
  }, [currentFont]);

  const getFontClass = () => {
    switch (currentFont) {
      case "noto":
        return noto.className;
      case "inter":
        return inter.className;
      default:
        return noto.className;
    }
  };

  return (
    <button
      onClick={toggleFont}
      className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
    >
      Toggle Font
    </button>
  );
};

export default FontSwitcher;
