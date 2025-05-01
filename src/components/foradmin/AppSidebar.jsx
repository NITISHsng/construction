import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Users, MessageSquare, Mail, FolderOpen, Briefcase, Star,
  Users2, BarChart2, Activity, Download, Bell, Home,
  Menu, X, LogOut
} from 'lucide-react';

const navItemClass = (isActive, collapsed) =>
  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
    isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
  } ${collapsed ? "justify-center" : ""}`;

const NavItem = ({ to, icon: Icon, label, collapsed, onClick }) => (
  <NavLink
    to={to}
    end={to === "/admin/"}
    className={({ isActive }) => navItemClass(isActive, collapsed)}
    onClick={onClick}
  >
    <Icon size={20} />
    {!collapsed && <span>{label}</span>}
  </NavLink>
);

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside className={`bg-white border-r border-gray-200 h-screen transition-all duration-300 flex flex-col ${collapsed ? "w-16" : "w-64"}`}>
      {/* Top Logo/Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold">WI</span>
            </div>
            <h1 className="font-bold text-xl text-blue-600">WowInfra</h1>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded hover:bg-gray-100 ${collapsed ? "mx-auto" : "ml-auto"}`}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        <NavItem to="/admin/" icon={Home} label="Dashboard" collapsed={collapsed} />
        <NavItem to="/admin/projects" icon={FolderOpen} label="Project Management" collapsed={collapsed} />
        <NavItem to="/admin/usermanagement" icon={Users} label="User Management" collapsed={collapsed} />
        <NavItem to="/admin/queries" icon={MessageSquare} label="Query Management" collapsed={collapsed} />
        <NavItem to="/admin/contacts" icon={Mail} label="Contact Messages" collapsed={collapsed} />
        <NavItem to="/admin/services" icon={Briefcase} label="Service Management" collapsed={collapsed} />
        <NavItem to="/admin/services" icon={Users2} label="Team Management" collapsed={collapsed} />
        <NavItem to="/admin/services" icon={BarChart2} label="Analytics" collapsed={collapsed} />
        <NavItem to="/admin/services" icon={Activity} label="Admin Logs" collapsed={collapsed} />
        <NavItem to="/admin/services" icon={Star} label="Testimonials" collapsed={collapsed} />
        <NavItem to="/admin/services" icon={Bell} label="Notifications" collapsed={collapsed} />
        <NavItem to="/admin/services" icon={Download} label="Export & Backup" collapsed={collapsed} />
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button className={`w-full flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${collapsed ? "justify-center" : "justify-start"}`}>
          <LogOut size={20} />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}
