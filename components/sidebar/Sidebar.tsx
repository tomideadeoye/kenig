"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  ArrowLeft,
  LayoutGrid,
  Users,
  Package,
  Camera,
  MessageSquareX,
  Receipt,
  ShieldCheck,
  Settings,
  BookOpen,
  FileText,
  History,
  ChevronDown,
  X,
} from "lucide-react";

// --- Main Sidebar Component ---
export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
    if (onClose) {
      onClose();
    }
  };

  const navItems = [
    {
      href: "/dashboard",
      icon: LayoutGrid,
      label: "Dashboard",
    },
    {
      label: "Users",
      icon: Users,
      badge: 5,
      subItems: [
        { href: "/users/all", label: "All Users" },
        { href: "/users/roles", label: "Roles & Permissions" },
      ],
    },
    {
      label: "All Listings",
      icon: Package,
      subItems: [
        { href: "/listings/delivery-jobs", label: "Delivery Jobs", badge: 5 },
        { href: "/listings/delivery-offers", label: "Delivery Offers" },
        { href: "/listings/marketplace", label: "Marketplace", badge: 5 },
        { href: "/delivery-details", label: "Delivery Details" },
      ],
    },
    {
      href: "/flex-reward",
      icon: Camera,
      label: "Flex Reward",
    },
    {
      href: "/disputes",
      icon: MessageSquareX,
      label: "Disputes",
    },
    {
      label: "Transactions",
      icon: Receipt,
      subItems: [{ href: "/transactions/all", label: "All Transactions" }],
    },
    {
      href: "/user-support-ticket-1",
      icon: ShieldCheck,
      label: "User Support Ticket",
    },
    {
      label: "Settings",
      icon: Settings,
      subItems: [{ href: "/settings/main", label: "Main Settings" }],
    },
    {
      href: "/user-support-ticket-2",
      icon: ShieldCheck,
      label: "User Support Ticket",
    },
    {
      href: "/blog-broadcast",
      icon: BookOpen,
      label: "Blog & Broadcast",
    },
    {
      href: "/templates",
      icon: FileText,
      label: "Templates",
    },
    {
      href: "/audit-logs",
      icon: History,
      label: "Audit Logs",
    },
  ];

  return (
    <aside className="h-screen w-[262px] flex flex-col bg-[#142F7C] text-white">
      {/* Sidebar Header */}
      <div className="h-[72px] bg-white flex items-center justify-between px-5">
        <div className="text-blue-900 font-bold text-xl">
          FLEX<span className="text-orange-500">Delivery</span>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 md:hidden" 
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8 hidden md:flex">
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) =>
          item.subItems ? (
            <Collapsible key={item.label}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-11 px-3 text-base font-normal text-gray-400 hover:bg-[#1E3A8A] hover:text-white"
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                  {item.badge && (
                    <Badge className="ml-auto bg-orange-500 text-white rounded-full px-2">
                      {item.badge}
                    </Badge>
                  )}
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 pl-8">
                {item.subItems.map((sub) => {
                  const isActive = pathname.startsWith(sub.href);
                  return (
                    <Button
                      key={sub.label}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start h-10 px-3 text-sm font-normal",
                        isActive
                          ? "bg-white/20 text-white"
                          : "text-gray-400 hover:bg-[#1E3A8A] hover:text-white"
                      )}
                      onClick={() => handleNavigation(sub.href)}
                    >
                      {sub.label}
                      {sub.badge && (
                        <Badge className="ml-auto bg-orange-500 text-white rounded-full px-2">
                          {sub.badge}
                        </Badge>
                      )}
                    </Button>
                  );
                })}
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <Button
              key={item.label}
              variant="ghost"
              className={cn(
                "w-full justify-start h-11 px-3 text-base font-normal",
                pathname.startsWith(item.href!)
                  ? "bg-white/20 text-white"
                  : "text-gray-400 hover:bg-[#1E3A8A] hover:text-white"
              )}
              onClick={() => handleNavigation(item.href!)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          )
        )}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 flex flex-col items-center space-y-2">
        <Badge variant="secondary" className="bg-gray-200 text-gray-800">
          Dev
        </Badge>
        <p className="text-xs text-gray-400">v2.0</p>
      </div>
    </aside>
  );
}