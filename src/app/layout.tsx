import React from "react";
import Footer from "@/components/Footer";
import { GeistMono, GeistSans } from "geist/font";
import './globals.css';
import Header from "@/components/Header";
import { LayoutProps } from ".next/types/app/layout";


const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html className={`${GeistSans.variable} ${GeistMono.variable}`} lang="en">
      <body>
        <div className="flex flex-col bg-[#111] bg-blend-normal">
          <Header/>
          <main className="flex flex-col items-center px-16 pt-px pb-9 -translate-y-9 w-full bg-blend-normal max-md:px-5 max-md:max-w-full">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default Layout;