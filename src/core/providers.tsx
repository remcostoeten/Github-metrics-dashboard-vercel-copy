"use client";

import FontSwitcher from "@/components/FontToggle";
import { ReactNode, useState, useEffect } from "react";
import { Toaster } from "sonner";
import { Noto_Sans_JP } from "next/font/google";

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
          <FontSwitcher onFontChange={handleFontChange} />{" "}
          {/* Pass the callback */}
        </body>
      </html>
    </>
  );
}
