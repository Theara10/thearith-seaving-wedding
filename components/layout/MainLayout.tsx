// components/layout/MainLayout.tsx
import React, { ReactNode } from "react";
// import Navbar from './Navbar'; // If you have a Navbar

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-brand-background text-brand-text">
      {/* <Navbar /> */}

      <main>{children}</main>
      <footer className="text-center py-8 text-sm text-brand-primary">
        <p>Made with love by [Your Names]</p>
        <p>&copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default MainLayout;
