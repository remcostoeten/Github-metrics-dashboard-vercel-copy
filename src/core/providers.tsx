"use client";

import { ReactNode, useState } from "react";
import { Toaster } from "sonner";
import { Noto_Sans_JP } from "next/font/google";
import SettingsPopout from "@/components/settings/SettingsPopout";
import SettingsPopout2 from "./SettingsPopout2";

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
          <SettingsPopout2 />
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
