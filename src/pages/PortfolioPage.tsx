import React, { useState, useEffect } from "react";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  X, 
  ChevronRight, 
  Menu, 
  ArrowRight, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Building2 
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Ongoing'>('All');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      {/* Header (Same as Landing Page) */}
      <nav className="fixed w-full z-[100] transition-all duration-500 bg-admin-black py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-admin-orange flex items-center justify-center rounded-sm transition-transform group-hover:rotate-12">
              <Building2 className="text-white w-7 h-7" />
            </div>
            <div>
              <span className="text-xl font-display font-black text-white tracking-tighter leading-none block uppercase">Lucky</span>
              <span className="text-[10px] font-bold text-admin-orange tracking-[0.3em] uppercase block -mt-1">Constructions</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            <Link to="/" className="text-[10px] font-black uppercase tracking-[0.3em] text-white hover:text-admin-orange transition-colors">Home</Link>
            <a href="/#services" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 hover:text-admin-orange transition-colors">Services</a>
            <Link to="/portfolio" className="text-[10px] font-black uppercase tracking-[0.3em] text-admin-orange border-b-2 border-admin-orange pb-1">Portfolio</Link>
            <a href="/#contact" className="px-8 py-3 bg-admin-orange text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-admin-black transition-all">Get a Quote</a>
          </div>

          <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(true)}>
            <Menu size={30} />
          </button>
        </div>
      </nav>

      {/* Portfolio Title Section */}
      <section className="pt-40 pb-20 bg-admin-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-admin-orange/5 -skew-x-12 transform translate-x-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div>
              <span className="text-admin-orange font-bold uppercase tracking-[0.5em] text-[10px] mb-6 block">Our Architectural Journey</span>
              <h1 className="text-6xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
                Complete <br />
                <span className="text-transparent border-t border-b border-white/20">Portfolio</span>
              </h1>
              <p className="max-w-xl text-gray-400 font-medium text-lg leading-relaxed">
                A showcase of structural excellence and design integrity across Tirupati. From high-rise residential complexes to state-of-the-art commercial hubs.
              </p>
            </div>
            <div className="flex gap-4">
               {['All', 'Completed', 'Ongoing'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${
                      filter === f ? 'bg-admin-orange text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'
                    }`}
                  >
                    {f}
                  </button>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {filteredProjects.map((project) => (
              <motion.div 
                layout
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] bg-gray-100 overflow-hidden relative mb-8 shadow-2xl">
                  <img 
                    src={project.image_url} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-admin-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute top-6 left-6">
                    <span className="bg-admin-black text-white text-[9px] font-black uppercase tracking-widest px-4 py-2">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-6 text-[10px] font-bold text-admin-orange uppercase tracking-[0.2em]">
                    <span className="flex items-center gap-2"><MapPin size={14}/> {project.location}</span>
                    <span className="flex items-center gap-2"><Calendar size={14}/> {project.year}</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold uppercase tracking-tight leading-tight group-hover:text-admin-orange transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 font-medium leading-relaxed">
                    {project.description || "Lucky Constructions delivered this project with absolute structural precision and architectural brilliance."}
                  </p>
                  <div className="pt-6 flex items-center gap-3 group-hover:translate-x-3 transition-transform duration-500">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] border-b-2 border-admin-orange pb-1">View Full Details</span>
                    <ArrowRight size={16} className="text-admin-orange" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer (Same as Landing Page) */}
      <footer className="bg-admin-black text-white pt-32 pb-12 overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
            <div>
              <div className="flex items-center gap-4 mb-10">
                 <Building2 className="text-admin-orange w-10 h-10" />
                 <h2 className="text-4xl font-display font-black uppercase tracking-tighter">Lucky <span className="text-admin-orange">Constructions</span></h2>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed max-w-lg mb-12">
                Pioneering the future of construction in Andhra Pradesh. We don't just build structures; we build trust and legacies that stand the test of time.
              </p>
              <div className="flex gap-6">
                 {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" className="w-12 h-12 border border-white/10 flex items-center justify-center rounded-full hover:bg-admin-orange hover:border-admin-orange transition-all">
                       <Icon size={20} />
                    </a>
                 ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10">
               <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-admin-orange">Address</h4>
                  <p className="text-gray-400 text-sm font-medium leading-loose uppercase">
                    123 Builders Lane,<br />
                    Tirupati, AP 517501
                  </p>
               </div>
               <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-admin-orange">Contact</h4>
                  <div className="space-y-4">
                     <a href="tel:+919876543210" className="block text-gray-400 hover:text-white transition-colors font-medium">+91 98765 43210</a>
                     <a href="mailto:contact@luckyconstructions.com" className="block text-gray-400 hover:text-white transition-colors font-medium">info@luckyconstructions.com</a>
                  </div>
               </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between gap-6 items-center">
             <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">© 2026 Lucky Constructions. All rights reserved.</p>
             <div className="flex gap-10 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
             </div>
          </div>
        </div>
      </footer>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
             <div className="absolute inset-0 bg-admin-black/98 backdrop-blur-xl" onClick={() => setSelectedProject(null)} />
             <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="relative bg-white w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl"
             >
                <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 z-50 bg-admin-black text-white p-3 hover:bg-admin-orange transition-colors">
                  <X size={24} />
                </button>
                <div className="flex-1 bg-gray-50 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                   {selectedProject.media && selectedProject.media.length > 0 ? (
                      selectedProject.media.map((m: any, i: number) => (
                         <div key={i} className="shadow-2xl">
                           {m.type === 'video' ? (
                             <video controls className="w-full h-auto"><source src={m.url} /></video>
                           ) : (
                             <img src={m.url} className="w-full h-auto" />
                           )}
                         </div>
                      ))
                   ) : (
                     <img src={selectedProject.image_url} className="w-full h-auto shadow-2xl" />
                   )}
                </div>
                <div className="w-full md:w-[450px] p-10 md:p-16 flex flex-col justify-between overflow-y-auto bg-white">
                   <div>
                      <span className="bg-admin-orange/10 text-admin-orange text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 inline-block mb-10">{selectedProject.category}</span>
                      <h2 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tighter leading-none mb-10">{selectedProject.title}</h2>
                      <div className="space-y-10">
                        <div className="space-y-4">
                           <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">Overview</h4>
                           <p className="text-gray-600 text-sm leading-relaxed font-medium">{selectedProject.description || "A masterclass in structural engineering, this project represents Lucky Constructions' commitment to quality and architectural vision."}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-10 pt-10 border-t border-gray-100">
                           <div className="space-y-3">
                              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">Location</p>
                              <p className="font-bold text-xs uppercase tracking-widest flex items-center gap-2"><MapPin size={14} className="text-admin-orange" /> {selectedProject.location}</p>
                           </div>
                           <div className="space-y-3">
                              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">Completion</p>
                              <p className="font-bold text-xs uppercase tracking-widest flex items-center gap-2"><Calendar size={14} className="text-admin-orange" /> {selectedProject.year}</p>
                           </div>
                        </div>
                      </div>
                   </div>
                   <button onClick={() => setSelectedProject(null)} className="mt-20 w-full bg-admin-black text-white py-6 font-black uppercase tracking-[0.4em] text-[10px] hover:bg-admin-orange transition-colors">Close View</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
