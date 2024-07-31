// "use client";

// import FontSwitcher from "@/components/FontToggle";
// import { ReactNode, useState, useEffect } from "react";
// import { Toaster } from "sonner";
// import { Noto_Sans_JP } from "next/font/google";
// import { AnimationControlButton } from "@/components/settings/AnimationControlButton";
// import { AnimationSpeedSlider } from "@/components/settings/AnimationSpeedSlider";
// import FetchAmountSlider from "@/components/settings/FetchAmountSlider";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import {NextUIProvider} from "@nextui-org/react";

// const noto = Noto_Sans_JP({ subsets: ["latin"] });

// type ProviderProps = {
//   children: ReactNode;
// };

// export default function Providers({ children }: ProviderProps) {
//   const [fontClass, setFontClass] = useState(noto.className);

//   const handleFontChange = (newFontClass: string) => {
//     setFontClass(newFontClass);
//   };

//   return (
//      <NextUIProvider>
//      <html className={fontClass} lang="en">
//         <body>
//           <TooltipProvider>
//             {children}
//             <Toaster />

//             {/* <FetchAmountSlider />
//           <AnimationControlButton />
//           <AnimationSpeedSlider/>
//           <FontSwitcher onFontChange={handleFontChange} />{" "}
//           Pass the callback */}
//           </TooltipProvider>
//         </body>
//         </html>
//         </NextUIProvider>

//   );
// }

'use client';

import FontSwitcher from '@/components/FontToggle';
import { ReactNode, useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { Noto_Sans_JP } from 'next/font/google';
import { AnimationControlButton } from '@/components/settings/AnimationControlButton';
import { AnimationSpeedSlider } from '@/components/settings/AnimationSpeedSlider';
import FetchAmountSlider from '@/components/settings/FetchAmountSlider';
import { TooltipProvider } from '@/components/ui/tooltip';

const noto = Noto_Sans_JP({ subsets: ['latin'] });

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
          <TooltipProvider>
            {children}
            <Toaster />

            {/* <FetchAmountSlider />
          <AnimationControlButton />
          <AnimationSpeedSlider/>
          <FontSwitcher onFontChange={handleFontChange} />{" "}
          Pass the callback */}
          </TooltipProvider>
        </body>
      </html>
    </>
  );
}
