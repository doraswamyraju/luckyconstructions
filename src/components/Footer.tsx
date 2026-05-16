import { MapPin, Phone, Mail, ChevronRight, Hammer, Building2, Instagram, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-brand-black pt-24 pb-12 border-t border-white/10 text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 relative">
          <div className="col-span-1">
            <div className="flex items-center gap-2 group mb-6">
              <img src="/logo.jpeg" alt="Lucky Constructions Logo" className="h-12 w-auto object-contain bg-white p-1 rounded-sm" />
              <span className="font-display font-bold text-2xl tracking-tight text-white">
                LUCKY <span className="text-brand-gold">CONSTRUCTIONS</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
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
            <h4 className="font-display font-bold text-lg uppercase tracking-tight mb-6 text-white border-b border-brand-gold/30 pb-2 inline-block">Contact Info</h4>
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

          <div>
            <h4 className="font-display font-bold text-lg uppercase tracking-tight mb-6 text-white border-b border-brand-gold/30 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-4">
              {['Founder', 'Our Services', 'Portfolio', 'Testimonials', 'Admin Portal', 'Privacy Policy'].map((link) => (
                <li key={link}>
                  <a href={link === 'Portfolio' ? '/portfolio' : (link === 'Admin Portal' ? '/admin' : '/#' + link.toLowerCase().replace(' ', ''))} className="text-gray-400 hover:text-brand-gold transition-colors text-sm flex items-center gap-2">
                    <ChevronRight size={14} /> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-brand-gold/5 p-8 border border-brand-gold/20">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Build Your Dream</h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">Ready to start your next construction project with the experts?</p>
            <a href="/#contact" className="block text-center bg-brand-gold text-white py-4 font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-brand-black transition-all">Start Now</a>
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
  );
}
