"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  ChevronDown,
  Bell,
  User,
  Settings,
  UserCircle,
  LogOut,
  Mail,
  Calendar,
  FileText
} from "lucide-react";

export function TopNavbar() {
  const [quickActionsOpen, setQuickActionsOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  // Mock data for quick actions
  const quickActions = [
    { icon: Mail, label: "Send Email" },
    { icon: Calendar, label: "Schedule Meeting" },
    { icon: FileText, label: "Generate Report" },
    { icon: Settings, label: "System Settings" },
  ];

  // Mock notifications
  const notifications = [
    { id: 1, text: "New message received", time: "2 min ago" },
    { id: 2, text: "Server update scheduled", time: "1 hour ago" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left section - Search bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search for anything"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Right section - Action buttons */}
        <div className="flex items-center space-x-4">
          {/* Quick actions button */}
          <div className="relative">
            <Button 
              variant="ghost" 
              className="flex items-center space-x-1"
              onClick={() => setQuickActionsOpen(!quickActionsOpen)}
            >
              <span>Quick actions</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${quickActionsOpen ? 'rotate-180' : ''}`} />
            </Button>
            
            {/* Quick actions dropdown */}
            {quickActionsOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-50">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {action.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Notification bell */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white">
              2
            </Badge>
            
            {/* Notifications dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-50">
                <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-200">
                  Notifications
                </div>
                {notifications.map((notification) => (
                  <div key={notification.id} className="px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                    <p className="text-sm text-gray-800">{notification.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
                <button className="w-full px-4 py-2 text-sm text-center text-blue-600 hover:bg-gray-100">
                  View all notifications
                </button>
              </div>
            )}
          </div>

          {/* User avatars */}
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <Avatar key={i} className="h-8 w-8 border-2 border-white">
                <AvatarImage src={`https://picsum.photos/100/100?random=${i}`} />
                <AvatarFallback>?</AvatarFallback>
              </Avatar>
            ))}
          </div>

          {/* User profile */}
          <div className="relative">
            <button 
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                BE
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium">e6rhrdfbrdsb ergeteb</div>
                <div className="text-xs text-gray-500">ADMIN</div>
              </div>
              <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* User menu dropdown */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium">e6rhrdfbrdsb ergeteb</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <UserCircle className="h-4 w-4 mr-3" />
                  Profile
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-200">
                  <LogOut className="h-4 w-4 mr-3" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Click away handler */}
      {(quickActionsOpen || notificationsOpen || userMenuOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setQuickActionsOpen(false);
            setNotificationsOpen(false);
            setUserMenuOpen(false);
          }}
        />
      )}
    </header>
  );
}