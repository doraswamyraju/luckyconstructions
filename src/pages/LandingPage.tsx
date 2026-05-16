import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Hammer, HardHat, Compass, Ruler, Building2, MapPin, Phone, Mail, 
  ChevronRight, MessageCircle, ArrowUp, Star, Lock, ArrowRight,
  ShieldCheck, Clock, Users 
} from "lucide-react";
import ProjectDetailModal from "../components/ProjectDetailModal";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SERVICES = [
  {
    icon: <Building2 className="w-8 h-8 text-brand-gold" />,
    title: "General Contracting",
    description: "End-to-end project management ensuring quality, safety, and timely delivery of large-scale commercial and residential builds.",
  },
  {
    icon: <HardHat className="w-8 h-8 text-brand-gold" />,
    title: "Renovation & Remodeling",
    description: "Transforming existing structures with modern aesthetics, structural reinforcements, and state-of-the-art materials.",
  },
  {
    icon: <Ruler className="w-8 h-8 text-brand-gold" />,
    title: "Civil Engineering",
    description: "Comprehensive infrastructure planning, including earthwork, foundation design, and structural assessments.",
  },
  {
    icon: <Compass className="w-8 h-8 text-brand-gold" />,
    title: "Architectural Design",
    description: "Collaborating with visionaries to create blueprints that balance form, function, and sustainable building practices.",
  },
];

const HERO_SLIDES = [
  "https://images.unsplash.com/photo-1541888088320-b30fef6a3479?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1590483736622-398544071bda?auto=format&fit=crop&q=80"
];

// Data is now fetched from the API

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [projectTab, setProjectTab] = useState<'completed' | 'progress'>('completed');
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [dbTestimonials, setDbTestimonials] = useState<any[]>([]);
  const [dbBlogs, setDbBlogs] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "", service: "SERVICES", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Fetch Projects
    fetch('/api/get_data.php?type=projects')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          const featured = data.filter((p: any) => p.is_featured == 1);
          if (featured.length > 0) {
            setDbProjects(featured);
          } else {
            const latestCompleted = data
              .filter((p: any) => p.status === 'Completed')
              .sort((a: any, b: any) => b.id - a.id)
              .slice(0, 3);
            const latestOngoing = data
              .filter((p: any) => p.status === 'Ongoing')
              .sort((a: any, b: any) => b.id - a.id)
              .slice(0, 3);
            setDbProjects([...latestCompleted, ...latestOngoing]);
          }
        }
      });

    // Fetch Testimonials
    fetch('/api/get_data.php?type=testimonials')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setDbTestimonials(data.filter((t: any) => t.visible != 0 && t.status === 'Approved'));
      });

    // Fetch Blogs
    fetch('/api/get_data.php?type=blogs')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setDbBlogs(data.filter((b: any) => b.status === 'Published').slice(0, 3));
      });
  }, []);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    fetch('/api/save_data.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'leads', action: 'add', data: { ...leadForm, status: 'New', submitted_at: new Date().toISOString() } })
    })
    .then(res => res.json())
    .then(data => {
      setIsSubmitting(false);
      if (data.success) {
        alert("Thank you! We will get back to you soon.");
        setLeadForm({ name: "", email: "", phone: "", service: "SERVICES", message: "" });
      }
    });
  };

  const completedProjects = dbProjects.filter(p => p.status === 'Completed');
  const inProgressProjects = dbProjects.filter(p => p.status === 'Ongoing');
  const activeTestimonials = dbTestimonials;

  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacityHero = useTransform(scrollY, [0, 800], [1, 0]);

  // Hero Slider Auto-Play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-sans text-brand-black bg-brand-white selection:bg-brand-gold selection:text-white">
      <Header />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-brand-black">
        {/* Background Image Slider with Dark Overlay */}
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0 bg-brand-black">
          <AnimatePresence mode="sync">
            <motion.img
              key={currentSlide}
              src={HERO_SLIDES[currentSlide]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.5, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/90 to-transparent lg:to-brand-black/30" />
        </motion.div>

        <div className="container relative z-10 mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            
            {/* Left Content */}
            <div className="w-full lg:w-3/5 text-white mt-10 md:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="h-1 w-12 bg-brand-gold" />
                <span className="text-brand-gold font-bold uppercase tracking-[0.2em] text-sm">Est. 2019</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white uppercase leading-[0.9] tracking-tighter mb-8"
              >
                Building <br />
                <span className="text-transparent border-text" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.8)", color: "transparent" }}>Tomorrow,</span> <br />
                Today.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 font-normal leading-relaxed"
              >
                We are Lucky Constructions. Engineering robust structures, pioneering modern architecture, and defining urban landscapes in Tirupati and beyond.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex gap-3 items-center mt-8"
              >
                 {HERO_SLIDES.map((_, i) => (
                    <button 
                      key={i} 
                      onClick={() => setCurrentSlide(i)}
                      className={`h-1.5 transition-all duration-300 ${currentSlide === i ? 'w-10 bg-brand-gold' : 'w-4 bg-white/30 hover:bg-white/50'}`}
                      aria-label={`Go to slide ${i+1}`}
                    />
                 ))}
              </motion.div>
            </div>

            {/* Right Form Card */}
            <div className="w-full lg:w-2/5">
              <motion.div
                initial={{ opacity: 0, x: 50, rotateY: -10 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white p-8 md:p-10 shadow-2xl relative"
                style={{ perspective: 1000 }}
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-brand-gold" />
                <h3 className="font-display text-brand-black font-bold text-2xl md:text-3xl uppercase mb-2">Discuss Your Project</h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">Drop us a line to discuss your vision, and our lead engineers will get back to you.</p>
                <form className="space-y-4" onSubmit={handleLeadSubmit}>
                  <input required type="text" placeholder="FULL NAME" className="w-full bg-gray-50 border border-gray-100 p-4 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-brand-gold focus:bg-white transition-colors text-brand-black" value={leadForm.name} onChange={e => setLeadForm({...leadForm, name: e.target.value})} />
                  <input required type="email" placeholder="EMAIL ADDRESS" className="w-full bg-gray-50 border border-gray-100 p-4 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-brand-gold focus:bg-white transition-colors text-brand-black" value={leadForm.email} onChange={e => setLeadForm({...leadForm, email: e.target.value})} />
                  <div className="flex flex-col sm:flex-row gap-4">
                     <input required type="tel" placeholder="PHONE" className="w-full sm:w-1/2 bg-gray-50 border border-gray-100 p-4 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-brand-gold focus:bg-white transition-colors text-brand-black" value={leadForm.phone} onChange={e => setLeadForm({...leadForm, phone: e.target.value})} />
                     <select className="w-full sm:w-1/2 bg-gray-50 border border-gray-100 p-4 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-brand-gold focus:bg-white transition-colors text-gray-500 appearance-none" value={leadForm.service} onChange={e => setLeadForm({...leadForm, service: e.target.value})}>
                       <option value="SERVICES">SERVICES</option>
                       <option value="COMMERCIAL">COMMERCIAL</option>
                       <option value="RESIDENTIAL">RESIDENTIAL</option>
                       <option value="INFRASTRUCTURE">INFRASTRUCTURE</option>
                     </select>
                  </div>
                  <textarea required placeholder="PROJECT BRIEF" className="w-full bg-gray-50 border border-gray-100 p-4 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-brand-gold focus:bg-white transition-colors text-brand-black h-24" value={leadForm.message} onChange={e => setLeadForm({...leadForm, message: e.target.value})} />
                  <button type="submit" disabled={isSubmitting} className="w-full bg-brand-gold text-white mt-4 py-4 font-bold uppercase tracking-widest hover:bg-brand-black transition-colors flex justify-center items-center gap-2 disabled:opacity-50">
                    {isSubmitting ? "Submitting..." : "Request Callback"} <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-brand-gold z-20 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">
            <div className="text-center text-brand-black">
              <div className="font-display font-bold text-3xl mb-2">6+</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-black/70">Years Exp</div>
            </div>
            <div className="text-center text-brand-black">
              <div className="font-display font-bold text-3xl mb-2">15+</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-black/70">Projects</div>
            </div>
            <div className="text-center text-brand-black">
              <div className="font-display font-bold text-3xl mb-2">30+</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-black/70">Masons</div>
            </div>
            <div className="text-center text-brand-black">
              <div className="font-display font-bold text-3xl mb-2">30+</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-black/70">Unskilled</div>
            </div>
            <div className="text-center text-brand-black">
              <div className="font-display font-bold text-3xl mb-2">20+</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-black/70">Skilled</div>
            </div>
            <div className="text-center text-brand-black">
              <div className="font-display font-bold text-3xl mb-2">20000+</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-black/70">Shuttering Sft</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Founder Section */}
      <section id="founder" className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8 }}
               className="relative"
            >
              <div className="absolute inset-0 bg-brand-gold translate-x-4 translate-y-4 -z-10" />
              <img 
                src="/founder.png" 
                alt="Founder of Lucky Constructions" 
                className="w-full h-auto object-cover transition-all duration-700 shadow-2xl"
              />
            </motion.div>
            <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-1 w-8 bg-brand-gold" />
                <span className="text-brand-gold font-bold uppercase tracking-[0.1em] text-sm">Leadership</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-black uppercase leading-tight tracking-tight mb-8">
                Vision Driven By Experience
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Founded in 2019, Lucky Constructions started with a simple belief: construction is not just about assembling materials, it's about crafting legacies. Our leadership has guided the company through complex engineering challenges and defining urban landscapes.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our success is rooted in our people. From the draftsmen to the site managers, we foster a culture of precision, safety, and unwavering commitment to client vision.
              </p>
              
              <div className="bg-gray-50 border-l-4 border-brand-gold p-6 italic text-gray-700 font-medium">
                "We don't just build buildings; we build trust. Every project is a testament to our dedication to doing things right the first time."
              </div>
              <div className="mt-6 font-display font-bold uppercase text-brand-black">
                - The Founder, Lucky Constructions
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 bg-gray-50 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-1 w-8 bg-brand-gold" />
                <span className="text-brand-gold font-bold uppercase tracking-[0.1em] text-sm">Our Expertise</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-brand-black uppercase leading-tight tracking-tight">
                Full-Scale <br /> Construction Solutions
              </h2>
            </div>
            <p className="text-gray-600 max-w-sm">
              From breaking ground to the final inspection, we bring a wealth of expertise, heavy machinery, and dedicated craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 group hover:-translate-y-2 transition-transform duration-300 shadow-sm border border-gray-100 hover:shadow-xl"
              >
                <div className="mb-6 p-4 bg-gray-50 inline-block group-hover:bg-brand-gold/10 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-brand-black mb-4 group-hover:text-brand-gold transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 md:py-32 bg-white">
         <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-1 w-8 bg-brand-gold" />
                    <span className="text-brand-gold font-bold uppercase tracking-[0.1em] text-sm">Why Us</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-black uppercase leading-tight tracking-tight mb-8">
                    Built on Reliability
                  </h2>
                  <p className="text-gray-600 mb-8 max-w-lg">
                     Choosing a construction partner is a massive decision. We mitigate risks through rigorous planning and transparent communication.
                  </p>
                  
                  <div className="space-y-6">
                     <div className="flex gap-4">
                        <div className="shrink-0 mt-1 bg-brand-gold/10 p-3 text-brand-gold"><ShieldCheck className="w-6 h-6" /></div>
                        <div>
                           <h4 className="font-display font-bold text-xl uppercase mb-2">Uncompromising Safety</h4>
                           <p className="text-gray-600 text-sm">Our site protocols consistently exceed local and national safety regulations, protecting our crew and your investment.</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="shrink-0 mt-1 bg-brand-gold/10 p-3 text-brand-gold"><Clock className="w-6 h-6" /></div>
                        <div>
                           <h4 className="font-display font-bold text-xl uppercase mb-2">On-Time Delivery</h4>
                           <p className="text-gray-600 text-sm">We use advanced project management methodologies to ensure milestones are met precisely when promised.</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="shrink-0 mt-1 bg-brand-gold/10 p-3 text-brand-gold"><Users className="w-6 h-6" /></div>
                        <div>
                           <h4 className="font-display font-bold text-xl uppercase mb-2">Collaborative Approach</h4>
                           <p className="text-gray-600 text-sm">You are kept in the loop at every stage. We build relationships just as strong as our buildings.</p>
                        </div>
                     </div>
                  </div>
               </div>
               
               <div className="relative h-[600px]">
                 <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80" alt="Construction Site" className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-multiply" />
                 <div className="absolute inset-0 bg-brand-gold/20 mix-blend-multiply" />
                 <div className="absolute -bottom-8 -left-8 bg-brand-black text-white p-8 max-w-sm hidden md:block">
                    <h4 className="text-3xl font-display font-bold mb-2 uppercase text-brand-gold">Top 10</h4>
                    <p className="text-sm leading-relaxed">Recognized among the top contractors in Andhra Pradesh for structural excellence.</p>
                 </div>
               </div>
            </div>
         </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 md:py-32 bg-brand-black text-white relative overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 opacity-10 mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541888088320-b30fef6a3479?auto=format&fit=crop&q=80')`, backgroundAttachment: 'fixed', backgroundSize: 'cover' }}
        />
        <div className="container relative z-10 mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-1 w-8 bg-brand-gold" />
              <span className="text-brand-gold font-bold uppercase tracking-[0.1em] text-sm">Portfolio</span>
              <div className="h-1 w-8 bg-brand-gold" />
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase leading-tight tracking-tight mb-12">
              Our Landmarks
            </h2>

            {/* Tab Switcher */}
            <div className="flex justify-center gap-8 md:gap-16 border-b border-white/10 pb-4 max-w-2xl mx-auto">
              <button
                onClick={() => setProjectTab('completed')}
                className={`font-display font-bold uppercase tracking-widest pb-4 text-sm md:text-base border-b-2 transition-colors relative top-[17px] ${
                  projectTab === 'completed' ? 'border-brand-gold text-brand-gold' : 'border-transparent text-gray-500 hover:text-white'
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setProjectTab('progress')}
                className={`font-display font-bold uppercase tracking-widest pb-4 text-sm md:text-base border-b-2 transition-colors relative top-[17px] ${
                  projectTab === 'progress' ? 'border-brand-gold text-brand-gold' : 'border-transparent text-gray-500 hover:text-white'
                }`}
              >
                In Progress
              </button>
            </div>
          </div>

          <div className="mt-16">
            {projectTab === 'completed' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {completedProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative h-[450px] overflow-hidden cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <img 
                      src={project.media?.find((m: any) => m.is_main)?.url || project.media?.[0]?.url || project.image_url || "https://images.unsplash.com/photo-1541888088320-b30fef6a3479?auto=format&fit=crop&q=80"} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                      <div className="text-brand-gold font-bold uppercase text-xs tracking-widest mb-2">{project.category}</div>
                      <h4 className="text-white font-display font-bold text-2xl uppercase tracking-tight mb-4">{project.title}</h4>
                      <div className="flex justify-between items-center text-gray-400 text-xs font-bold uppercase tracking-widest pt-4 border-t border-white/10">
                        <span>Completion Year</span>
                        <span className="text-white">{project.year || "2023"}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {inProgressProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative h-[450px] overflow-hidden cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <img 
                      src={project.media?.find((m: any) => m.is_main)?.url || project.media?.[0]?.url || project.image_url || "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80"} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                      <div className="text-brand-gold font-bold uppercase text-xs tracking-widest mb-2">{project.category}</div>
                      <h4 className="text-white font-display font-bold text-2xl uppercase tracking-tight mb-4">{project.title}</h4>
                      <div className="flex justify-between items-center text-gray-400 text-xs font-bold uppercase tracking-widest pt-4 border-t border-white/10">
                        <span>Current Status</span>
                        <span className="text-brand-gold">{project.completion_percentage}% Complete</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-20 text-center">
            <Link 
              to="/portfolio"
              className="inline-flex items-center gap-4 px-14 py-6 bg-transparent border-2 border-white text-white font-bold uppercase tracking-[0.4em] text-xs hover:bg-white hover:text-black transition-all group no-underline"
            >
              View Full Portfolio
              <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectDetailModal 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
            />
          )}
        </AnimatePresence>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-1 w-8 bg-brand-gold" />
              <span className="text-brand-gold font-bold uppercase tracking-[0.1em] text-sm">Client Stories</span>
              <div className="h-1 w-8 bg-brand-gold" />
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase leading-tight tracking-tight text-brand-black">
              What They Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-10 md:p-12 relative shadow-sm border border-gray-100"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-brand-gold/5 flex items-center justify-center">
                  <Star className="text-brand-gold w-6 h-6" fill="currentColor" />
                </div>
                <p className="text-xl md:text-2xl text-brand-black font-medium leading-relaxed mb-8 italic">
                  "{testimonial.text}"
                </p>
                <div className="relative z-10">
                  <h4 className="font-display text-lg font-bold text-brand-black uppercase tracking-tight mb-1">{testimonial.name}</h4>
                  <p className="text-brand-gold text-xs font-bold uppercase tracking-widest">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      {dbBlogs.length > 0 && (
        <section id="blog" className="py-24 bg-white border-t border-gray-50">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-1 w-8 bg-brand-gold" />
                  <span className="text-brand-gold font-bold uppercase tracking-[0.1em] text-sm">Insights</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-brand-black uppercase leading-tight tracking-tight">
                  Latest <br /> From Our Blog
                </h2>
              </div>
              <Link to="/blog" className="text-[10px] font-black uppercase tracking-widest text-brand-black hover:text-brand-gold transition-colors flex items-center gap-2 group">
                View All Articles <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {dbBlogs.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/blog/${post.id}`}>
                    <div className="aspect-[16/10] overflow-hidden bg-gray-100 mb-6">
                      <img 
                        src={post.image || "https://images.unsplash.com/photo-1541913080-21400ee8b244?auto=format&fit=crop&q=80&w=600"} 
                        alt={post.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                    </div>
                  </Link>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                      <span>{post.category}</span>
                      <span className="text-gray-400">{post.date}</span>
                    </div>
                    <Link to={`/blog/${post.id}`}>
                      <h3 className="text-xl font-display font-bold uppercase tracking-tight text-brand-black hover:text-brand-gold transition-colors">
                        {post.title}
                      </h3>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About CTA Section */}
      <section id="about" className="py-24 bg-brand-gold text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
          <Hammer className="w-96 h-96" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold uppercase leading-tight tracking-tight mb-6">
                Safety First. <br /> Quality Always.
              </h2>
              <p className="text-lg text-white/90 font-medium mb-8 leading-relaxed max-w-lg">
                At Lucky Constructions, we believe a strong foundation goes beyond concrete and steel. It starts with integrity, transparent client communication, and a relentless commitment to occupational safety in Tirupati and surrounding areas.
              </p>
              <ul className="space-y-4 font-bold text-white uppercase tracking-wider">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-black" />
                  ISO 9001 Certified
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-black" />
                  Zero-Incident Safety Record (2025)
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-black" />
                  Award-Winning Design Team
                </li>
              </ul>
            </div>
            
            <div className="bg-brand-black p-10 md:p-16 text-center lg:text-left">
              <h3 className="text-3xl lg:text-4xl font-display font-bold uppercase leading-tight tracking-tight text-white mb-6">
                Let's Build It.
              </h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto lg:mx-0">
                Are you actively planning your next big project? Partner with us for reliable timelines and structural brilliance.
              </p>
              <a href="#contact" className="inline-block bg-white text-brand-black px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-brand-gold hover:text-white transition-colors">
                Start the Process
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
        {/* Scroll to Top */}
        <AnimatePresence>
          {isScrolled && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-brand-black p-4 rounded-full shadow-2xl hover:bg-brand-gold hover:text-white transition-all group border border-gray-100"
              title="Back to Top"
            >
              <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/917893872131"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center relative group"
          title="Chat on WhatsApp"
        >
          <MessageCircle size={28} fill="currentColor" />
          <span className="absolute right-full mr-4 bg-white text-brand-black px-4 py-2 rounded-lg text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100">
            Chat with us
          </span>
        </a>

        {/* Call Button */}
        <a
          href="tel:+917893872131"
          className="bg-brand-gold text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center relative group"
          title="Call us Now"
        >
          <Phone size={28} fill="currentColor" />
          <span className="absolute right-full mr-4 bg-white text-brand-black px-4 py-2 rounded-lg text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100">
            Call us: +91 7893872131
          </span>
        </a>
      </div>
    </div>
  );
}
