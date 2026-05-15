import React from "react";
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Upload, 
  Save, 
  Lock 
} from "lucide-react";

export default function AdminProfile() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-4 border-admin-black pb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">System Credentials</p>
          <h1 className="text-4xl md:text-5xl font-admin-header font-extrabold uppercase tracking-tight text-admin-black">
            Profile Settings
          </h1>
        </div>
        <button className="bg-admin-orange text-white px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-admin-black transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Save size={18} /> Save All Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Avatar & Basic Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white border-2 border-admin-black p-8 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-admin-orange" />
            <div className="relative inline-block">
              <div className="w-40 h-40 bg-admin-black text-white flex items-center justify-center text-6xl font-admin-header font-bold mx-auto mb-6">
                DR
              </div>
              <button className="absolute bottom-4 right-0 bg-admin-orange text-white p-3 hover:bg-admin-black transition-colors shadow-lg">
                <Upload size={20} />
              </button>
            </div>
            <h3 className="text-xl font-admin-header font-black uppercase tracking-tight text-admin-black">Doraswamy Raju</h3>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-admin-orange mt-2">Master Administrator</p>
            <p className="text-xs text-gray-500 mt-6 leading-relaxed">
              Managing structural excellence and operational logistics for Lucky Constructions since 2018.
            </p>
          </div>

          <div className="bg-admin-black text-white p-8 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Shield size={14} className="text-admin-orange" /> System Access
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-[10px] uppercase font-medium text-gray-400">Role</span>
                <span className="text-[10px] uppercase font-bold tracking-widest">Super Admin</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-[10px] uppercase font-medium text-gray-400">Last Login</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-admin-orange">Today, 09:42 AM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-medium text-gray-400">IP Address</span>
                <span className="text-[10px] uppercase font-bold tracking-widest">192.168.1.45</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Forms */}
        <div className="lg:col-span-2 space-y-12">
          {/* Personal Info */}
          <section className="bg-white border border-admin-border p-8 md:p-12 space-y-8">
            <h3 className="text-2xl font-admin-header font-black uppercase tracking-tight text-admin-black flex items-center gap-3">
              <User size={24} className="text-admin-orange" /> Personal Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    defaultValue="Doraswamy Raju"
                    className="w-full bg-admin-surface border-2 border-admin-border pl-12 pr-4 py-3 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-admin-black transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Designation</label>
                <input 
                  type="text" 
                  defaultValue="Master Admin"
                  className="w-full bg-admin-surface border-2 border-admin-border px-4 py-3 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-admin-black transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="email" 
                    defaultValue="admin@luckyconstructions.in"
                    className="w-full bg-admin-surface border-2 border-admin-border pl-12 pr-4 py-3 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-admin-black transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="tel" 
                    defaultValue="+91 9876543210"
                    className="w-full bg-admin-surface border-2 border-admin-border pl-12 pr-4 py-3 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-admin-black transition-colors"
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Professional Bio</label>
                <textarea 
                  rows={4}
                  className="w-full bg-admin-surface border-2 border-admin-border px-4 py-3 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-admin-black transition-colors resize-none"
                  defaultValue="Overseeing all administrative and project management tasks for Lucky Constructions."
                />
              </div>
            </div>
          </section>

          {/* Security */}
          <section className="bg-white border border-admin-border p-8 md:p-12 space-y-8">
            <h3 className="text-2xl font-admin-header font-black uppercase tracking-tight text-admin-black flex items-center gap-3">
              <Lock size={24} className="text-admin-orange" /> Security Credentials
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Current Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••••••"
                  className="w-full bg-admin-surface border-2 border-admin-border px-4 py-3 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-admin-black transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">New Password</label>
                <input 
                  type="password" 
                  className="w-full bg-admin-surface border-2 border-admin-border px-4 py-3 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-admin-black transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Confirm Password</label>
                <input 
                  type="password" 
                  className="w-full bg-admin-surface border-2 border-admin-border px-4 py-3 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-admin-black transition-colors"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
