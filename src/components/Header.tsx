import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Lock } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/#home" },
  { name: "Founder", href: "/#founder" },
  { name: "Services", href: "/#services" },
  { name: "Projects", href: "/#projects" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact", href: "/#contact" },
];

interface HeaderProps {
  variant?: 'light' | 'dark';
}

export default function Header({ variant = 'light' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isScrolledState = isScrolled || variant === 'dark';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolledState ? "bg-white/90 backdrop-blur-md shadow-sm border-gray-100 py-3" : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3 group">
            <img src="/logo.jpeg" alt="Lucky Constructions Logo" className="h-[50px] w-auto object-contain rounded-sm" />
            <span className={`font-display font-bold text-2xl tracking-tight hidden sm:block ${isScrolledState ? "text-brand-black" : "text-white"}`}>
              LUCKY <span className="text-brand-gold">CONSTRUCTIONS</span>
            </span>
          </a>

          <div className="hidden lg:flex gap-8 items-center bg-brand-black/10 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-semibold text-xs uppercase tracking-widest transition-colors hover:text-brand-gold ${
                  isScrolledState ? "text-brand-black" : "text-white"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => window.location.href = '/admin'}
              className={`p-2 rounded-full border transition-all ${
                isScrolledState 
                  ? "border-gray-200 text-gray-400 hover:text-admin-orange hover:border-admin-orange" 
                  : "border-white/20 text-white/50 hover:text-white hover:border-white"
              }`}
              title="Admin Dashboard"
            >
              <Lock size={16} />
            </button>
            <a
              href="/#contact"
              className="bg-brand-gold text-white px-6 py-2.5 font-bold uppercase tracking-widest text-xs hover:bg-brand-black transition-colors rounded-sm"
            >
              Get a Quote
            </a>
          </div>

          <button
            className={`lg:hidden p-2 ${isScrolledState ? "text-brand-black" : "text-white"}`}
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
    </>
  );
}
