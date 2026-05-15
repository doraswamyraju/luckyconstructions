import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  MapPin, 
  Building2 
} from "lucide-react";

const PROJECTS_DATA = [
  { id: 1, name: "Skyview Commercial Plaza", type: "Commercial", location: "Tirupati Central", progress: 75, status: "Ongoing" },
  { id: 2, name: "The Vertex Residences", type: "Residential", location: "Bairagi Patteda", progress: 100, status: "Completed" },
  { id: 3, name: "Tirupati Grand Mall", type: "Commercial", location: "Renigunta Road", progress: 40, status: "Ongoing" },
  { id: 4, name: "Highway 9 Overpass", type: "Infrastructure", location: "NH 71", progress: 100, status: "Completed" },
  { id: 5, name: "Bridgeport Logistics Hub", type: "Industrial", location: "Industrial Estate", progress: 65, status: "Ongoing" },
  { id: 6, name: "Titanium Residential Complex", type: "Residential", location: "MR Palli", progress: 20, status: "Ongoing" },
];

export default function ProjectsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredProjects = PROJECTS_DATA.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">Portfolio Control</p>
          <h1 className="text-4xl md:text-5xl font-admin-header font-extrabold uppercase tracking-tight text-admin-black">
            Project Management
          </h1>
        </div>
        <button className="bg-admin-orange text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-admin-black transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Plus size={18} /> Add New Project
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 border border-admin-border">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search projects by name or location..." 
            className="w-full bg-admin-surface border border-admin-border pl-12 pr-4 py-3 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-admin-orange transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <div className="relative min-w-[160px]">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select 
              className="w-full bg-admin-surface border border-admin-border pl-12 pr-4 py-3 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-admin-orange transition-colors appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white border-2 border-admin-black flex flex-col group">
            <div className="p-6 flex-1 space-y-6">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-admin-black text-white">
                      {project.type}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 border border-admin-black ${
                      project.status === "Completed" ? "bg-green-100 text-green-800" : "bg-admin-orange/10 text-admin-orange"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-admin-header font-black uppercase tracking-tight text-admin-black leading-tight">
                    {project.name}
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin size={14} className="text-admin-orange" />
                  <span className="text-xs font-bold uppercase tracking-widest">{project.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Building2 size={14} className="text-admin-orange" />
                  <span className="text-xs font-bold uppercase tracking-widest">Structural Build</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Construction Progress</span>
                  <span className="text-xs font-bold text-admin-black">{project.progress}%</span>
                </div>
                <div className="h-4 bg-admin-surface border border-admin-border relative overflow-hidden">
                  <div 
                    className={`absolute top-0 left-0 h-full transition-all duration-1000 ${
                      project.status === "Completed" ? "bg-admin-black" : "bg-admin-orange"
                    }`}
                    style={{ width: `${project.progress}%` }}
                  >
                    <div className="w-full h-full opacity-20 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-admin-black grid grid-cols-3 divide-x-2 divide-admin-black">
              <button className="p-4 hover:bg-admin-surface transition-colors flex items-center justify-center gap-2 group/btn">
                <Eye size={16} className="group-hover/btn:text-admin-orange" />
                <span className="text-[10px] font-bold uppercase tracking-widest">View</span>
              </button>
              <button className="p-4 hover:bg-admin-surface transition-colors flex items-center justify-center gap-2 group/btn">
                <Edit2 size={16} className="group-hover/btn:text-admin-orange" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Edit</span>
              </button>
              <button className="p-4 hover:bg-red-50 text-red-500 transition-colors flex items-center justify-center gap-2 group/btn">
                <Trash2 size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
