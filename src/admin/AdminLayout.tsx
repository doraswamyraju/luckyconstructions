import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquare, 
  FileText, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  ChevronRight
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const MENU_ITEMS = [
  { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
  { name: "Projects", path: "/admin/projects", icon: <Briefcase size={20} /> },
  { name: "Testimonials", path: "/admin/testimonials", icon: <MessageSquare size={20} /> },
  { name: "Blog", path: "/admin/blog", icon: <FileText size={20} /> },
  { name: "Profile", path: "/admin/profile", icon: <User size={20} /> },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-admin-surface font-admin-body text-admin-black flex">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-admin-black text-white transition-all duration-300 flex flex-col z-50`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-white/10 overflow-hidden whitespace-nowrap">
          <div className="w-8 h-8 bg-admin-orange shrink-0 flex items-center justify-center font-admin-header font-bold text-white">
            L
          </div>
          <span className={`font-admin-header font-bold text-xl tracking-tight transition-opacity ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}>
            LUCKY <span className="text-admin-orange">ADMIN</span>
          </span>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2">
          {MENU_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 p-3 transition-colors group overflow-hidden whitespace-nowrap ${
                  isActive 
                    ? "bg-admin-orange text-white" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className={isActive ? "text-white" : "text-admin-orange group-hover:text-white transition-colors"}>
                  {item.icon}
                </span>
                <span className={`font-bold text-xs uppercase tracking-widest transition-opacity ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button className="flex items-center gap-4 p-3 w-full text-gray-400 hover:bg-white/5 hover:text-white transition-colors overflow-hidden whitespace-nowrap">
            <Settings size={20} />
            <span className={`font-bold text-xs uppercase tracking-widest transition-opacity ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}>
              Settings
            </span>
          </button>
          <button className="flex items-center gap-4 p-3 w-full text-gray-400 hover:bg-white/5 hover:text-red-500 transition-colors overflow-hidden whitespace-nowrap">
            <LogOut size={20} />
            <span className={`font-bold text-xs uppercase tracking-widest transition-opacity ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-admin-border flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-admin-surface transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
              <span>Admin</span>
              <ChevronRight size={14} />
              <span className="text-admin-black">
                {MENU_ITEMS.find(item => item.path === location.pathname)?.name || "Dashboard"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 relative hover:bg-admin-surface transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-admin-orange"></span>
            </button>
            <div className="h-8 w-px bg-admin-border mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold uppercase tracking-tight">Doraswamy Raju</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Master Admin</p>
              </div>
              <div className="w-10 h-10 bg-admin-black flex items-center justify-center text-white font-bold">
                DR
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
