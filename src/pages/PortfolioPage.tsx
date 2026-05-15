import React, { useState, useEffect } from "react";
import { MapPin, Calendar, Clock, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Ongoing'>('All');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    fetch('/api/get_data.php?type=projects')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setProjects(data);
      });
  }, []);

  const filteredProjects = projects.filter(p => 
    filter === 'All' ? true : (filter === 'Completed' ? p.status === 'Completed' : p.status === 'Ongoing')
  );

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Header */}
      <section className="relative py-24 bg-admin-black text-white">
        <div className="container mx-auto px-6 relative z-10">
          <span className="text-admin-orange font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Our Legacy</span>
          <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none mb-8">
            Complete <span className="text-transparent border border-white/20 px-2">Portfolio</span>
          </h1>
          <p className="max-w-2xl text-gray-400 font-medium text-lg leading-relaxed">
            Explore our comprehensive history of excellence across commercial, residential, and industrial construction.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-40 bg-white border-b border-gray-100 py-6">
        <div className="container mx-auto px-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            {['All', 'Completed', 'Ongoing'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === f ? 'bg-admin-black text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Showing {filteredProjects.length} Projects
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProjects.map((project) => (
            <motion.div 
              layout
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/5] bg-gray-100 overflow-hidden relative mb-6">
                <img 
                  src={project.image_url} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-admin-black text-[9px] font-black uppercase tracking-widest px-3 py-1">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-[10px] font-bold text-admin-orange uppercase tracking-widest">
                   <div className="flex items-center gap-1"><MapPin size={12}/> {project.location}</div>
                   <div className="flex items-center gap-1"><Calendar size={12}/> {project.year}</div>
                </div>
                <h3 className="text-xl font-display font-bold uppercase leading-tight group-hover:text-admin-orange transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 pt-4 group-hover:translate-x-2 transition-transform">
                   <span className="text-[10px] font-black uppercase tracking-widest border-b-2 border-admin-orange pb-1">View Details</span>
                   <ChevronRight size={14} className="text-admin-orange" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
             <div className="absolute inset-0 bg-admin-black/95 backdrop-blur-md" onClick={() => setSelectedProject(null)} />
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative bg-white w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl"
             >
                <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 z-50 bg-admin-black text-white p-2">
                  <X size={24} />
                </button>
                <div className="flex-1 bg-gray-100 overflow-y-auto p-4 space-y-4">
                   {selectedProject.media && selectedProject.media.length > 0 ? (
                      selectedProject.media.map((m: any, i: number) => (
                         <div key={i}>
                           {m.type === 'video' ? (
                             <video controls className="w-full h-auto shadow-lg"><source src={m.url} /></video>
                           ) : (
                             <img src={m.url} className="w-full h-auto shadow-lg" />
                           )}
                         </div>
                      ))
                   ) : (
                     <img src={selectedProject.image_url} className="w-full h-auto shadow-lg" />
                   )}
                </div>
                <div className="w-full md:w-[400px] p-8 md:p-12 flex flex-col justify-between overflow-y-auto">
                   <div>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="bg-admin-orange text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">{selectedProject.category}</span>
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">ID: LC-{selectedProject.id}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight mb-6">{selectedProject.title}</h2>
                      <p className="text-gray-600 text-sm leading-relaxed mb-8">{selectedProject.description}</p>
                      <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Location</p>
                          <p className="font-bold text-xs uppercase tracking-tight">{selectedProject.location}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Year</p>
                          <p className="font-bold text-xs uppercase tracking-tight">{selectedProject.year}</p>
                        </div>
                      </div>
                   </div>
                   <button onClick={() => setSelectedProject(null)} className="mt-12 w-full bg-admin-black text-white py-5 font-bold uppercase tracking-widest text-[10px]">Close Project</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
