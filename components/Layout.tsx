import React, { ReactNode, useState } from "react";
import Head from "next/head";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { TopNavbar } from "@/components/TopNavbar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <TopNavbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile menu button */}
        <Button
          variant="outline"
          size="icon"
          className="ml-4 mt-4 absolute z-10 md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-4 w-4" />
        </Button>
        
        {/* Sidebar - hidden on mobile by default, shown when sidebarOpen is true */}
        <div className={`absolute md:relative z-20 md:z-0 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:block`}>
          <Sidebar />
        </div>
        
        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        
        <main className="flex-1 overflow-auto">
          <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
          <div className="p-4 pt-16 md:pt-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;