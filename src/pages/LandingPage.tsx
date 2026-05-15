import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Menu, X, ArrowRight, Hammer, HardHat, Compass, Ruler, Building2, Phone, Mail, MapPin, Star, ChevronRight, ShieldCheck, Clock, Users, Lock } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Founder", href: "#founder" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

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

const COMPLETED_PROJECTS = [
  {
    image: "https://images.unsplash.com/photo-1541888088320-b30fef6a3479?auto=format&fit=crop&q=80",
    name: "Skyview Commercial Plaza",
    category: "Commercial",
    year: "2023"
  },
  {
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80",
    name: "The Vertex Residences",
    category: "Residential",
    year: "2022"
  },
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
    name: "Corporate Headquarters",
    category: "Commercial",
    year: "2021"
  },
];

const IN_PROGRESS_PROJECTS = [
  {
    image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80",
    name: "Tirupati Grand Mall",
    category: "Commercial",
    status: "80% Complete"
  },
  {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80",
    name: "Highway 9 Overpass",
    category: "Infrastructure",
    status: "65% Complete"
  },
  {
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80",
    name: "Emerald Housing Block",
    category: "Residential",
    status: "40% Complete"
  },
];

const TESTIMONIALS = [
  { name: "Rahul Verma", role: "Commercial Developer", quote: "Lucky Constructions exceeded our timelines without compromising quality. An absolute benchmark in structural engineering." },
  { name: "Sneha Reddy", role: "Resident, Tirupati", quote: "The renovation they handled for our family estate was seamless. Their attention to safety and material quality is phenomenal." },
  { name: "Kiran Kumar", role: "City Planner", quote: "I've worked with many contractors across Andhra Pradesh, but their commitment to architectural integrity makes them stand out." }
];

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [projectTab, setProjectTab] = useState<'completed' | 'progress'>('completed');

  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacityHero = useTransform(scrollY, [0, 800], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hero Slider Auto-Play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeProjects = projectTab === 'completed' ? COMPLETED_PROJECTS : IN_PROGRESS_PROJECTS;

  return (
    <div className="font-sans text-brand-black bg-brand-white selection:bg-brand-gold selection:text-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-gray-100 py-3" : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 group">
            <img src="/logo.jpg" alt="Lucky Constructions Logo" className="h-[50px] w-auto object-contain rounded-sm" />
            <span className={`font-display font-bold text-2xl tracking-tight hidden sm:block ${isScrolled ? "text-brand-black" : "text-white"}`}>
              LUCKY <span className="text-brand-gold">CONSTRUCTIONS</span>
            </span>
          </a>

          <div className="hidden lg:flex gap-8 items-center bg-brand-black/10 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-semibold text-xs uppercase tracking-widest transition-colors hover:text-brand-gold ${
                  isScrolled ? "text-brand-black" : "text-white"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/admin"
              className={`p-2 rounded-full border transition-all ${
                isScrolled 
                  ? "border-gray-200 text-gray-400 hover:text-admin-orange hover:border-admin-orange" 
                  : "border-white/20 text-white/50 hover:text-white hover:border-white"
              }`}
              title="Admin Dashboard"
            >
              <Lock size={16} />
            </Link>
            <a
              href="#contact"
              className="bg-brand-gold text-white px-6 py-2.5 font-bold uppercase tracking-widest text-xs hover:bg-brand-black transition-colors rounded-sm"
            >
              Get a Quote
            </a>
          </div>

          <button
            className={`lg:hidden p-2 ${isScrolled ? "text-brand-black" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-brand-black text-white flex flex-col justify-center items-center"
          >
            <button
              className="absolute top-6 right-6 p-2 text-white hover:text-brand-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-8 text-center">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display font-bold text-4xl uppercase tracking-widest hover:text-brand-gold transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                <span className="text-brand-gold font-bold uppercase tracking-[0.2em] text-sm">Est. 1998</span>
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
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder="FULL NAME" className="w-full bg-gray-50 border border-gray-100 p-4 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-brand-gold focus:bg-white transition-colors text-brand-black" />
                  <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-gray-50 border border-gray-100 p-4 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-brand-gold focus:bg-white transition-colors text-brand-black" />
                  <div className="flex flex-col sm:flex-row gap-4">
                     <input type="tel" placeholder="PHONE" className="w-full sm:w-1/2 bg-gray-50 border border-gray-100 p-4 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-brand-gold focus:bg-white transition-colors text-brand-black" />
                     <select className="w-full sm:w-1/2 bg-gray-50 border border-gray-100 p-4 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-brand-gold focus:bg-white transition-colors text-gray-500 appearance-none">
                       <option>SERVICES</option>
                       <option>COMMERCIAL</option>
                       <option>RESIDENTIAL</option>
                       <option>INFRASTRUCTURE</option>
                     </select>
                  </div>
                  <button type="submit" className="w-full bg-brand-gold text-white mt-4 py-4 font-bold uppercase tracking-widest hover:bg-brand-black transition-colors flex justify-center items-center gap-2">
                    Request Callback <ArrowRight className="w-4 h-4" />
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center text-brand-black">
              <div className="font-display font-bold text-5xl mb-2">25+</div>
              <div className="text-sm font-bold uppercase tracking-widest text-brand-black/70">Years Exp</div>
            </div>
            <div className="text-center text-brand-black">
              <div className="font-display font-bold text-5xl mb-2">150+</div>
              <div className="text-sm font-bold uppercase tracking-widest text-brand-black/70">Projects</div>
            </div>
            <div className="text-center text-brand-black">
              <div className="font-display font-bold text-5xl mb-2">50+</div>
              <div className="text-sm font-bold uppercase tracking-widest text-brand-black/70">Engineers</div>
            </div>
            <div className="text-center text-brand-black">
              <div className="font-display font-bold text-5xl mb-2">100%</div>
              <div className="text-sm font-bold uppercase tracking-widest text-brand-black/70">Safety</div>
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
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" 
                alt="Founder of Lucky Constructions" 
                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
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
                Founded in 1998, Lucky Constructions started with a simple belief: construction is not just about assembling materials, it's about crafting legacies. For over two decades, our leadership has guided the company through complex engineering challenges, economic shifts, and technological advancements.
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

          {/* Dynamic Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-16">
            <AnimatePresence mode="wait">
              {activeProjects.map((project, index) => {
                // Different sizing for masonry feel
                let colSpan = "md:col-span-4";
                if (index === 0) colSpan = "md:col-span-8";
                else if (index === 1) colSpan = "md:col-span-4";
                else if (index === 2) colSpan = "md:col-span-12 lg:col-span-6";

                return (
                  <motion.div
                    key={project.name + projectTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`group relative overflow-hidden bg-gray-900 cursor-pointer min-h-[300px] md:min-h-[400px] ${colSpan}`}
                  >
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out mix-blend-luminosity grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                    <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-center gap-3 mb-2">
                           <p className="text-brand-gold font-bold uppercase tracking-widest text-xs">
                             {project.category}
                           </p>
                           <div className="w-1 h-1 bg-white/50 rounded-full" />
                           <p className="text-white/70 text-xs font-bold uppercase tracking-widest">
                             {project.year || project.status}
                           </p>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight text-white line-clamp-2 pr-4">
                          {project.name}
                        </h3>
                      </div>
                      <div className="w-12 h-12 bg-brand-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                         <ArrowRight className="w-6 h-6 text-brand-black" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          
          <div className="mt-16 text-center">
             <button className="border border-white/20 px-8 py-4 text-white font-bold uppercase tracking-wider hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold transition-colors inline-flex items-center gap-2">
                View Full Portfolio
             </button>
          </div>
        </div>
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
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-10 shadow-sm border border-gray-100 relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Star className="w-24 h-24 stroke-1 fill-current text-brand-gold" />
                </div>
                <div className="flex gap-1 text-brand-gold mb-8 content-relative z-10">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-600 font-medium italic mb-8 relative z-10 leading-relaxed min-h-[100px]">
                  "{testimonial.quote}"
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

      {/* Contact / Footer */}
      <footer id="contact" className="bg-brand-black pt-24 pb-12 border-t border-white/10 text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 mb-20 relative">
            <div className="col-span-1">
              <div className="flex items-center gap-2 group mb-6">
                <img src="/logo.jpg" alt="Lucky Constructions Logo" className="h-12 w-auto object-contain bg-white p-1 rounded-sm" />
                <span className="font-display font-bold text-2xl tracking-tight text-white">
                  LUCKY <span className="text-brand-gold">CONSTRUCTIONS</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
                Shaping skylines and building futures since 1998. Your trusted civil engineering partner in Tirupati.
              </p>
            </div>

            <div className="col-span-1">
              <h4 className="font-display font-bold text-lg uppercase tracking-tight mb-6 text-white">Contact Info</h4>
              <ul className="space-y-6 text-gray-400 text-sm">
                <li className="flex items-start gap-4 hover:text-brand-gold transition-colors">
                  <div className="mt-1"><MapPin className="w-5 h-5 text-brand-gold shrink-0" /></div>
                  <span className="leading-relaxed">Shop.No.38a, 1st Floor, Tuda Complex,<br />Bairagi patteda, Tirupati,<br />Andhra Pradesh 517502</span>
                </li>
                <li className="flex items-center gap-4 hover:text-brand-gold transition-colors">
                  <div className="mt-0.5"><Phone className="w-5 h-5 text-brand-gold shrink-0" /></div>
                  <span>+91 7893872131</span>
                </li>
                <li className="flex items-center gap-4 hover:text-brand-gold transition-colors">
                  <div className="mt-0.5"><Mail className="w-5 h-5 text-brand-gold shrink-0" /></div>
                  <span>hello@luckyconstructions.in</span>
                </li>
              </ul>
            </div>

            <div className="col-span-1">
              <h4 className="font-display font-bold text-lg uppercase tracking-tight mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3 font-semibold text-gray-400 text-sm uppercase tracking-wide">
                <li><a href="#founder" className="hover:text-brand-gold transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4"/> Founder</a></li>
                <li><a href="#services" className="hover:text-brand-gold transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4"/> Our Services</a></li>
                <li><a href="#projects" className="hover:text-brand-gold transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4"/> Portfolio</a></li>
                <li><a href="#testimonials" className="hover:text-brand-gold transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4"/> Testimonials</a></li>
                <li><Link to="/admin" className="hover:text-brand-gold transition-colors flex items-center gap-2 text-admin-orange font-bold"><Lock className="w-4 h-4"/> Admin Portal</Link></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4"/> Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} Lucky Constructions. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-brand-gold transition-colors">Instagram</a>
              <a href="#" className="hover:text-brand-gold transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-brand-gold transition-colors">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
