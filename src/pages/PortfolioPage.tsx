import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import ProjectDetailModal from "../components/ProjectDetailModal";
import Header from "../components/Header";
import Footer from "../components/Footer";

const getImageUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith('http') || url.startsWith('https') || url.startsWith('/')) return url;
  return `/uploads/${url}`;
};

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
    <div className="min-h-screen bg-white font-sans selection:bg-brand-gold selection:text-white">
      <Header variant="dark" />

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 bg-brand-black overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gold/5 -skew-x-12 translate-x-24" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-brand-gold/5 skew-x-12 -translate-x-12" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-1 w-12 bg-brand-gold" />
              <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-xs">Our Portfolio</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold text-white uppercase leading-[0.9] tracking-tighter mb-8 italic">
              Crafting <span className="text-transparent border-text" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.5)", color: "transparent" }}>Legacies</span> <br />
              In Stone.
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
              Explore our curated selection of residential, commercial, and infrastructure projects that define our commitment to engineering excellence.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-4 mt-16">
            {['All', 'Completed', 'Ongoing'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-10 py-4 text-[10px] font-black uppercase tracking-widest transition-all border ${
                  filter === f 
                    ? 'bg-brand-gold border-brand-gold text-white shadow-lg shadow-brand-gold/20' 
                    : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20'
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div 
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                    <img 
                      src={getImageUrl(project.media?.find((m: any) => m.is_main)?.url || project.media?.[0]?.url || project.image_url || "https://images.unsplash.com/photo-1541888088320-b30fef6a3479?auto=format&fit=crop&q=80")} 
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    <div className="absolute top-6 right-6">
                       <div className="bg-white/90 backdrop-blur-md px-4 py-2 text-[10px] font-black uppercase tracking-widest text-brand-black shadow-xl">
                          {project.year || '2024'}
                       </div>
                    </div>

                    <div className="absolute bottom-0 left-0 p-8 w-full">
                      <div className="text-brand-gold font-bold uppercase text-[10px] tracking-[0.2em] mb-3">{project.category}</div>
                      <h4 className="text-white font-display font-bold text-3xl uppercase tracking-tight mb-4 leading-none">{project.title}</h4>
                      <div className="flex justify-between items-center text-gray-400 text-[10px] font-bold uppercase tracking-widest pt-4 border-t border-white/10">
                        <span>{project.location}</span>
                        <span className="flex items-center gap-2 group-hover:text-brand-gold transition-colors">
                           View Case <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="py-32 text-center">
               <p className="text-gray-400 font-medium italic">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

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
