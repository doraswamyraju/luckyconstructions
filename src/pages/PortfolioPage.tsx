import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import ProjectDetailModal from "../components/ProjectDetailModal";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = projects.filter(p => 
    filter === 'All' ? true : (filter === 'Completed' ? p.status === 'Completed' : p.status === 'Ongoing')
  );

  return (
    <div className="min-h-screen bg-white">
      <Header variant="dark" />

      {/* PORTFOLIO CONTENT */}
      <section className="pt-40 pb-20 bg-brand-black relative">
        <div className="container mx-auto px-6 text-center">
           <span className="text-brand-gold font-bold uppercase tracking-[0.5em] text-[10px] mb-6 block">Our Legacy</span>
           <h1 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter mb-8 italic">
              COMPLETE PORTFOLIO
           </h1>
           <div className="flex justify-center gap-4 mt-12">
              {['All', 'Completed', 'Ongoing'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${
                      filter === f ? 'bg-brand-gold text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'
                    }`}
                  >
                    {f}
                  </button>
              ))}
           </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <motion.div 
                layout
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer relative bg-gray-50 overflow-hidden"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={project.image_url} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="text-brand-gold font-bold uppercase text-[10px] tracking-widest mb-2">{project.category}</div>
                  <h4 className="text-white font-display font-bold text-2xl uppercase tracking-tight mb-4">{project.title}</h4>
                  <div className="flex justify-between items-center text-gray-400 text-[10px] font-bold uppercase tracking-widest pt-4 border-t border-white/10">
                    <span>{project.location}</span>
                    <span className="text-white">{project.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER (Exact copy from LandingPage) */}
      <Footer />

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
