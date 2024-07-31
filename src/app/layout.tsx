import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { LayoutProps } from '@/types';
import Providers from '@/core/providers';
import './globals.css';
import FontSwitcher from '@/components/FontToggle';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Providers>
      <div className="flex flex-col bg-[#111] bg-blend-normal h-screen">
        <Header />
        <main className="flex flex-col items-center px-16 pt-px pb-9 -translate-y-9 w-full bg-blend-normal max-md:px-5 max-md:max-w-full">
          {children}
        </main>
        <Footer />
      </div>
    </Providers>
  );
};

export default Layout;
