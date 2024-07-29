"use client";

import FontSwitcher from "@/components/FontToggle";
import { ReactNode, useState, useEffect } from "react";
import { Toaster } from "sonner";
import { Noto_Sans_JP } from "next/font/google";
import { AnimationControlButton } from "@/components/settings/AnimationControlButton";
import { AnimationSpeedSlider } from "@/components/settings/AnimationSpeedSlider";
import FetchAmountSlider from "@/components/settings/FetchAmountSlider";

const noto = Noto_Sans_JP({ subsets: ["latin"] });

type ProviderProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProviderProps) {
  const [fontClass, setFontClass] = useState(noto.className);

  const handleFontChange = (newFontClass: string) => {
    setFontClass(newFontClass);
  };

  return (
    <>
      <html className={fontClass} lang="en">
        <body>
          {children}
          <Toaster />

          {/* <FetchAmountSlider />
          <AnimationControlButton />
          <AnimationSpeedSlider/>
          <FontSwitcher onFontChange={handleFontChange} />{" "}
          Pass the callback */}
        </body>
      </html>
    </>
  );
}
