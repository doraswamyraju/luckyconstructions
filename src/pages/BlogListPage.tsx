import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search, Calendar, User, ArrowRight, Tag } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const getImageUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith('http') || url.startsWith('https') || url.startsWith('/')) return url;
  return `/uploads/${url}`;
};

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('/api/get_data.php?type=blogs')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setBlogs(data);
      });
    window.scrollTo(0, 0);
  }, []);

  const filteredBlogs = blogs.filter(b => 
    b.status === 'Published' && b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <Header variant="dark" />

      {/* Hero Section */}
      <section className="pt-40 pb-24 bg-brand-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/5 -skew-x-12 translate-x-12" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Knowledge Hub</span>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter mb-8 italic">
              CONSTRUCTION <span className="text-transparent border-text" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.5)", color: "transparent" }}>INSIGHTS</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              Expert perspectives on structural engineering, safety protocols, and the future of urban infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Feed */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Main Content */}
            <div className="flex-1 space-y-16">
              {filteredBlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {filteredBlogs.map((post) => (
                    <motion.div 
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="group"
                    >
                      <Link to={`/blog/${post.id}`}>
                        <div className="aspect-[16/10] overflow-hidden bg-gray-100 mb-6">
                          <img 
                            src={getImageUrl(post.image || "https://images.unsplash.com/photo-1541913080-21400ee8b244?auto=format&fit=crop&q=80&w=800")} 
                            alt={post.title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          />
                        </div>
                      </Link>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                          <span className="bg-brand-gold/10 px-3 py-1 rounded-sm">{post.category}</span>
                          <span className="text-gray-400 flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                        </div>
                        <Link to={`/blog/${post.id}`}>
                          <h3 className="text-2xl font-display font-bold uppercase tracking-tight text-brand-black hover:text-brand-gold transition-colors leading-tight">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                          {post.content ? post.content.substring(0, 150) + "..." : "No description available."}
                        </p>
                        <Link 
                          to={`/blog/${post.id}`}
                          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-black hover:text-brand-gold transition-colors group/link"
                        >
                          Read Article <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 border-2 border-dashed border-gray-100">
                  <p className="text-gray-400 font-medium italic">No articles found matching your criteria.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-80 space-y-12">
              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-brand-black border-b-2 border-brand-gold pb-2 inline-block">Search Hub</h4>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search posts..."
                    className="w-full bg-gray-50 border border-gray-200 pl-12 pr-4 py-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-brand-gold transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-brand-black border-b-2 border-brand-gold pb-2 inline-block">Recent Posts</h4>
                <div className="space-y-6">
                  {blogs.slice(0, 3).map(post => (
                    <Link key={post.id} to={`/blog/${post.id}`} className="flex gap-4 group">
                      <div className="w-20 h-20 shrink-0 overflow-hidden bg-gray-100">
                        <img src={getImageUrl(post.image)} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                      </div>
                      <div>
                        <h5 className="text-[10px] font-bold uppercase leading-tight group-hover:text-brand-gold transition-colors line-clamp-2">{post.title}</h5>
                        <p className="text-[9px] text-gray-400 mt-1">{post.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
