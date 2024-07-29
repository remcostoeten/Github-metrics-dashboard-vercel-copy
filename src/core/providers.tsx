
'use client'

import { GeistProvider, CssBaseline } from "@geist-ui/core";
import { ReactNode } from "react";
import { Toaster } from "sonner";

type ProviderProps = {
    children: ReactNode
}

export default function Providers({ children }: ProviderProps) {
  return (
    <GeistProvider>
      <CssBaseline />
      {children}
      <Toaster />
    </GeistProvider>
  );
}