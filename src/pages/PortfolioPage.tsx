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
  Building2,
  Lock
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
      {/* HEADER (Exact copy from LandingPage) */}
      <nav className="fixed w-full z-[100] transition-all duration-500 bg-white/95 backdrop-blur-md shadow-sm py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
             <div className="w-10 h-10 bg-brand-black flex items-center justify-center">
                <Building2 className="text-brand-gold w-6 h-6" />
             </div>
             <div>
                <span className="text-xl font-display font-black text-brand-black tracking-tighter leading-none block">LUCKY</span>
                <span className="text-[10px] font-bold text-brand-gold tracking-[0.3em] uppercase block -mt-1">Constructions</span>
             </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8 bg-gray-100/50 px-8 py-3 rounded-full border border-gray-200">
            <Link to="/" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-brand-black transition-colors">Home</Link>
            <a href="/#services" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-brand-black transition-colors">Services</a>
            <Link to="/portfolio" className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-black border-b-2 border-brand-gold pb-1">Portfolio</Link>
            <a href="/#testimonials" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-brand-black transition-colors">Testimonials</a>
            <a href="/#contact" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-brand-black transition-colors">Contact</a>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button onClick={() => window.location.href = '/admin'} className="p-2 rounded-full border border-gray-200 text-gray-400 hover:text-brand-gold transition-all">
              <Lock size={16} />
            </button>
            <a href="#contact" className="bg-brand-gold text-white px-6 py-2.5 font-bold uppercase tracking-widest text-xs hover:bg-brand-black transition-colors rounded-sm shadow-lg shadow-brand-gold/20">
              Get a Quote
            </a>
          </div>

          <button className="lg:hidden text-brand-black" onClick={() => setIsMenuOpen(true)}>
            <Menu size={30} />
          </button>
        </div>
      </nav>

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
      <footer className="bg-brand-black text-white pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-brand-gold flex items-center justify-center">
                  <Building2 className="text-brand-black w-6 h-6" />
                </div>
                <h3 className="text-2xl font-display font-black tracking-tighter">LUCKY <span className="text-brand-gold">CONST</span></h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Shaping skylines and building futures since 1998. Your trusted civil engineering partner in Tirupati.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold transition-colors group">
                  <Instagram size={18} className="group-hover:text-brand-black" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold transition-colors group">
                  <Facebook size={18} className="group-hover:text-brand-black" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold transition-colors group">
                  <Linkedin size={18} className="group-hover:text-brand-black" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-8 border-b border-brand-gold/30 pb-2 inline-block">Contact Info</h4>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <MapPin className="text-brand-gold shrink-0" size={20} />
                  <span className="text-gray-400 text-sm leading-relaxed">Shop.No.38a, 1st Floor, Tuda Complex,<br />Bairagi patteda, Tirupati,<br />Andhra Pradesh 517502</span>
                </li>
                <li className="flex gap-4">
                  <Phone className="text-brand-gold shrink-0" size={20} />
                  <span className="text-gray-400 text-sm">+91 7893872131</span>
                </li>
                <li className="flex gap-4">
                  <Mail className="text-brand-gold shrink-0" size={20} />
                  <span className="text-gray-400 text-sm">hello@luckyconstructions.in</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-8 border-b border-brand-gold/30 pb-2 inline-block">Quick Links</h4>
              <ul className="space-y-4">
                {['Founder', 'Our Services', 'Portfolio', 'Testimonials', 'Admin Portal', 'Privacy Policy'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors text-sm flex items-center gap-2">
                      <ChevronRight size={14} /> {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-brand-gold/5 p-8 border border-brand-gold/20">
              <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Build Your Dream</h4>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">Ready to start your next construction project with the experts?</p>
              <a href="#contact" className="block text-center bg-brand-gold text-white py-4 font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-brand-black transition-all">Start Now</a>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest text-center md:text-left">
              © 2026 LUCKY CONSTRUCTIONS. ALL RIGHTS RESERVED.<br />
              <span className="text-gray-600">Built with ❤️ by <span className="text-brand-gold">Rajugari Ventures</span></span>
            </p>
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Linkedin</a>
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Detail Modal (Exact copy from LandingPage) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <div className="absolute inset-0 bg-brand-black/95 backdrop-blur-md" onClick={() => setSelectedProject(null)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white text-brand-black w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 z-50 p-2 bg-brand-black text-white hover:bg-brand-gold hover:text-brand-black transition-colors">
                <X size={24} />
              </button>
              
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-3/5 bg-gray-100 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                   {selectedProject.media && selectedProject.media.length > 0 ? (
                      selectedProject.media.map((m: any, i: number) => (
                        <div key={i} className="w-full">
                          {m.type === 'video' ? (
                            <video controls className="w-full h-auto"><source src={m.url} /></video>
                          ) : (
                            <img src={m.url} className="w-full h-auto" />
                          )}
                        </div>
                      ))
                   ) : (
                     <img src={selectedProject.image_url} className="w-full h-auto" />
                   )}
                </div>
                
                <div className="md:w-2/5 p-8 md:p-12 overflow-y-auto">
                  <div className="text-brand-gold font-bold uppercase text-xs tracking-[0.2em] mb-4">{selectedProject.category}</div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight mb-8 leading-tight">{selectedProject.title}</h2>
                  <p className="text-gray-600 mb-10 leading-relaxed font-medium">{selectedProject.description || "Lucky Constructions project delivery."}</p>
                  
                  <div className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-10">
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</div>
                      <div className="font-bold flex items-center gap-2 text-sm uppercase"><MapPin size={14} className="text-brand-gold" /> {selectedProject.location}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Completed</div>
                      <div className="font-bold flex items-center gap-2 text-sm uppercase"><Calendar size={14} className="text-brand-gold" /> {selectedProject.year}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
