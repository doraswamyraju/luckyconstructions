import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Calendar, User, ArrowLeft, Facebook, Twitter, Linkedin, Share2, Tag } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function BlogPostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/get_data.php?type=blogs`)
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: any) => p.id.toString() === id);
        setPost(found);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center font-bold uppercase tracking-widest">Loading...</div>;
  if (!post) return <div className="min-h-screen bg-white flex items-center justify-center font-bold uppercase tracking-widest">Post Not Found</div>;

  return (
    <div className="min-h-screen bg-white">
      <Header variant="dark" />

      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-brand-black relative">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-gold mb-8 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px] block">{post.category}</span>
            <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <span className="flex items-center gap-2 text-white"><User size={14} /> {post.author}</span>
              <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="container mx-auto px-6 -mt-16 relative z-20">
        <div className="aspect-[21/9] w-full overflow-hidden bg-gray-100 shadow-2xl">
          <img 
            src={post.image || "https://images.unsplash.com/photo-1541913080-21400ee8b244?auto=format&fit=crop&q=80&w=1200"} 
            className="w-full h-full object-cover" 
            alt={post.title} 
          />
        </div>
      </div>

      {/* Content Section */}
      <article className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {/* Share Sidebar */}
            <div className="flex md:flex-col gap-4 mb-12 md:fixed md:left-12 md:top-1/2 md:-translate-y-1/2">
              <button className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-brand-black hover:text-white transition-all">
                <Facebook size={18} />
              </button>
              <button className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-brand-black hover:text-white transition-all">
                <Twitter size={18} />
              </button>
              <button className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-brand-black hover:text-white transition-all">
                <Linkedin size={18} />
              </button>
              <button className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-brand-black hover:text-white transition-all">
                <Share2 size={18} />
              </button>
            </div>

            {/* Post Content */}
            <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:font-black prose-p:text-gray-600 prose-p:leading-relaxed">
              <div className="whitespace-pre-wrap text-lg text-gray-700 leading-relaxed font-medium">
                {post.content}
              </div>
            </div>

            {/* Tags/Categories */}
            <div className="mt-20 pt-8 border-t border-gray-100 flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-black">Topic:</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-sm">
                {post.category}
              </span>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts? (Optional placeholder) */}

      <Footer />
    </div>
  );
}
