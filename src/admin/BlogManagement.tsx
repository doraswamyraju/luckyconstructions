import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Eye, 
  Trash2, 
  Calendar, 
  User, 
  Tag 
} from "lucide-react";

const BLOG_POSTS = [
  {
    id: 1,
    title: "Modernizing Concrete Logistics for Urban High-Rises",
    author: "Admin",
    date: "Oct 15, 2024",
    category: "Industry",
    status: "Published",
    image: "https://images.unsplash.com/photo-1541913080-21400ee8b244?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    title: "Safety Protocols 2024: Zero-Accident Site Management",
    author: "Site Lead",
    date: "Oct 10, 2024",
    category: "Safety",
    status: "Draft",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    title: "Sustainable Building Materials: The Future of Infrastructure",
    author: "Admin",
    date: "Sep 25, 2024",
    category: "Company News",
    status: "Published",
    image: "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?auto=format&fit=crop&q=80&w=400"
  }
];

export default function BlogManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = BLOG_POSTS.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">Knowledge Sharing</p>
          <h1 className="text-4xl md:text-5xl font-admin-header font-extrabold uppercase tracking-tight text-admin-black">
            Blog Management
          </h1>
        </div>
        <button className="bg-admin-orange text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-admin-black transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Plus size={18} /> Create New Post
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 border border-admin-border">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="w-full bg-admin-surface border border-admin-border pl-12 pr-4 py-3 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-admin-orange transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative min-w-[160px]">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <select className="w-full bg-admin-surface border border-admin-border pl-12 pr-4 py-3 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-admin-orange transition-colors appearance-none">
            <option>All Categories</option>
            <option>Industry</option>
            <option>Safety</option>
            <option>Company News</option>
          </select>
        </div>
      </div>

      {/* Blog Posts List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white border border-admin-border flex flex-col md:flex-row overflow-hidden group hover:border-admin-black transition-colors">
            <div className="w-full md:w-64 h-48 md:h-auto overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            <div className="flex-1 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 ${
                    post.status === "Published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"
                  }`}>
                    {post.status}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-admin-orange flex items-center gap-1">
                    <Tag size={10} /> {post.category}
                  </span>
                </div>
                <h3 className="text-2xl font-admin-header font-black uppercase tracking-tight text-admin-black group-hover:text-admin-orange transition-colors">
                  {post.title}
                </h3>
                <div className="flex flex-wrap items-center gap-6 mt-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    <User size={12} className="text-admin-black" /> {post.author}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    <Calendar size={12} className="text-admin-black" /> {post.date}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-6 border-t border-admin-border">
                <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-admin-orange transition-colors">
                  <Edit2 size={14} /> Edit
                </button>
                <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-admin-orange transition-colors">
                  <Eye size={14} /> Preview
                </button>
                <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors">
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
