import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Star, 
  CheckCircle2, 
  Clock, 
  EyeOff, 
  Edit2, 
  Trash2,
  Quote
} from "lucide-react";

const TESTIMONIALS_DATA = [
  { 
    id: 1, 
    name: "Robert Miller", 
    role: "Project Manager", 
    project: "Bridgeport Logistics Hub", 
    text: "The structural integrity and attention to detail on the Logistics Hub were exceptional. Lucky Constructions delivered ahead of schedule.",
    rating: 5,
    date: "Oct 12, 2024",
    status: "Approved",
    visible: true
  },
  { 
    id: 2, 
    name: "Anita Rao", 
    role: "Homeowner", 
    project: "The Vertex Residences", 
    text: "Professional, reliable, and transparent throughout the building process. Highly recommended for premium residential projects.",
    rating: 5,
    date: "Sep 28, 2024",
    status: "Pending",
    visible: false
  },
  { 
    id: 3, 
    name: "Suresh Kumar", 
    role: "MD, Grand Mall Group", 
    project: "Tirupati Grand Mall", 
    text: "Complex engineering tasks were handled with precision. A true partner in large-scale commercial development.",
    rating: 4,
    date: "Aug 15, 2024",
    status: "Approved",
    visible: true
  },
];

export default function TestimonialsManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTestimonials = TESTIMONIALS_DATA.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">Feedback & Trust</p>
          <h1 className="text-4xl md:text-5xl font-admin-header font-extrabold uppercase tracking-tight text-admin-black">
            Testimonials
          </h1>
        </div>
        <button className="bg-admin-orange text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-admin-black transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Plus size={18} /> Add New Review
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 border border-admin-border relative">
        <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search reviews by name or project..." 
          className="w-full bg-admin-surface border border-admin-border pl-12 pr-4 py-3 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-admin-orange transition-colors"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Testimonials List */}
      <div className="space-y-4">
        {filteredTestimonials.map((t) => (
          <div key={t.id} className="bg-white border border-admin-border flex flex-col md:flex-row group hover:border-admin-black transition-colors">
            <div className="w-2 bg-admin-black shrink-0 group-hover:bg-admin-orange transition-colors" />
            
            <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Author Info */}
              <div className="lg:col-span-1 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-admin-black text-white flex items-center justify-center font-bold text-xl shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-admin-black uppercase tracking-tight">{t.name}</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed mt-1">
                      {t.role} <br /> {t.project}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 text-admin-orange">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < t.rating ? "currentColor" : "none"} />
                  ))}
                </div>
              </div>

              {/* Review Content */}
              <div className="lg:col-span-2 relative">
                <Quote className="absolute -top-4 -left-4 text-gray-100" size={48} />
                <p className="text-sm text-gray-600 italic leading-relaxed relative z-10">
                  "{t.text}"
                </p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-4">Submitted on {t.date}</p>
              </div>

              {/* Status & Actions */}
              <div className="lg:col-span-1 flex flex-col justify-between items-end gap-6">
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 flex items-center gap-2 ${
                    t.status === "Approved" ? "bg-green-100 text-green-800" : "bg-admin-orange/10 text-admin-orange"
                  }`}>
                    {t.status === "Approved" ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                    {t.status}
                  </span>
                  {t.visible ? (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-admin-black flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500" /> Public
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <EyeOff size={12} /> Hidden
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-admin-black text-[10px] font-bold uppercase tracking-widest hover:bg-admin-black hover:text-white transition-all flex items-center gap-2">
                    <Edit2 size={12} /> Edit
                  </button>
                  <button className="px-4 py-2 bg-red-50 text-red-500 border border-red-200 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center gap-2">
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
