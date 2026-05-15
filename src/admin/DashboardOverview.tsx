import React from "react";
import { 
  Plus, 
  ArrowUpRight, 
  Clock, 
  Briefcase, 
  MessageSquare, 
  FileText 
} from "lucide-react";

const STATS = [
  { label: "Total Projects", value: "48", trend: "+12%", icon: <Briefcase className="text-admin-orange" /> },
  { label: "Active Sites", value: "12", trend: "Steady", icon: <Clock className="text-admin-orange" /> },
  { label: "Pending Reviews", value: "5", trend: "-2", icon: <MessageSquare className="text-admin-orange" /> },
  { label: "Blog Posts", value: "24", trend: "+3", icon: <FileText className="text-admin-orange" /> },
];

const RECENT_PROJECTS = [
  { id: 1, name: "Skyview Commercial Plaza", status: "Ongoing", type: "Commercial", progress: 75 },
  { id: 2, name: "The Vertex Residences", status: "Completed", type: "Residential", progress: 100 },
  { id: 3, name: "Tirupati Grand Mall", status: "Ongoing", type: "Commercial", progress: 40 },
  { id: 4, name: "Highway 9 Overpass", status: "Completed", type: "Infrastructure", progress: 100 },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">System Status: Operational</p>
          <h1 className="text-4xl md:text-5xl font-admin-header font-extrabold uppercase tracking-tight text-admin-black">
            Control Center
          </h1>
        </div>
        <div className="flex gap-4">
          <button className="bg-white border-2 border-admin-black px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-admin-surface transition-colors flex items-center gap-2">
            View Analytics
          </button>
          <button className="bg-admin-orange text-white px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-admin-black transition-colors flex items-center gap-2">
            <Plus size={16} /> New Project
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white p-6 border border-admin-border relative overflow-hidden group hover:border-admin-orange transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              {stat.icon}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">{stat.label}</p>
            <div className="flex items-end gap-3">
              <p className="text-4xl font-admin-header font-black text-admin-black">{stat.value}</p>
              <span className="text-[10px] font-bold uppercase tracking-widest text-admin-orange pb-1 flex items-center gap-1">
                <ArrowUpRight size={10} /> {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Projects Table */}
        <div className="lg:col-span-2 bg-white border border-admin-border">
          <div className="p-6 border-b border-admin-border flex justify-between items-center bg-admin-black text-white">
            <h3 className="font-admin-header font-bold uppercase tracking-widest text-sm">Recent Structural Projects</h3>
            <button className="text-[10px] font-bold uppercase tracking-widest hover:text-admin-orange transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-admin-border bg-admin-surface">
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Project Name</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Type</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Progress</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border">
                {RECENT_PROJECTS.map((project) => (
                  <tr key={project.id} className="hover:bg-admin-surface transition-colors group">
                    <td className="p-4">
                      <p className="font-bold text-sm text-admin-black">{project.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase font-medium">{project.status}</p>
                    </td>
                    <td className="p-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-gray-100 px-2 py-1">
                        {project.type}
                      </span>
                    </td>
                    <td className="p-4 w-48">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-gray-100 relative">
                          <div 
                            className="absolute top-0 left-0 h-full bg-admin-orange transition-all duration-1000"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-admin-black">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <button className="text-admin-orange hover:text-admin-black transition-colors">
                        <Plus size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Notifications */}
        <div className="space-y-6">
          <div className="bg-admin-black text-white p-8 space-y-4">
            <h3 className="font-admin-header font-bold uppercase tracking-widest text-sm text-admin-orange">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              <button className="w-full bg-white/5 hover:bg-white/10 p-4 flex items-center justify-between group transition-colors">
                <span className="text-xs font-bold uppercase tracking-widest">Update Blog</span>
                <Plus size={14} className="text-admin-orange group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full bg-white/5 hover:bg-white/10 p-4 flex items-center justify-between group transition-colors">
                <span className="text-xs font-bold uppercase tracking-widest">Approve Reviews</span>
                <Plus size={14} className="text-admin-orange group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full bg-white/5 hover:bg-white/10 p-4 flex items-center justify-between group transition-colors">
                <span className="text-xs font-bold uppercase tracking-widest">Export Reports</span>
                <Plus size={14} className="text-admin-orange group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="bg-white border border-admin-border p-8">
            <h3 className="font-admin-header font-bold uppercase tracking-widest text-sm mb-6">Recent Alerts</h3>
            <div className="space-y-6">
              {[
                { time: "2h ago", msg: "New testimonial from Rahul Verma", urgent: false },
                { time: "5h ago", msg: "Progress updated: Skyview Plaza", urgent: true },
                { time: "1d ago", msg: "Server backup completed successfully", urgent: false }
              ].map((alert, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-1 shrink-0 ${alert.urgent ? "bg-admin-orange" : "bg-admin-black"}`} />
                  <div>
                    <p className="text-xs font-medium text-admin-black">{alert.msg}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
