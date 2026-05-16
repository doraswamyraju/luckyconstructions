import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Eye, 
  Trash2, 
  Calendar, 
  User, 
  Tag,
  X
} from "lucide-react";

export default function BlogManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "Admin",
    category: "Industry",
    status: "Published",
    image: "",
    content: "",
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchBlogs = () => {
    fetch('/api/get_data.php?type=blogs')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setBlogs(data);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const action = editingId ? 'update' : 'add';
    fetch('/api/save_data.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        type: 'blogs', 
        action: action, 
        data: { ...newBlog, id: editingId } 
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setIsAddModalOpen(false);
        fetchBlogs();
      }
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this post?")) {
      fetch('/api/save_data.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type: 'blogs', action: 'delete' })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) fetchBlogs();
      });
    }
  };

  const filteredPosts = blogs.filter(p => 
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
        <button 
          onClick={() => {
            setNewBlog({
              title: "",
              author: "Admin",
              category: "Industry",
              status: "Published",
              image: "",
              content: "",
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            });
            setEditingId(null);
            setIsAddModalOpen(true);
          }}
          className="bg-admin-orange text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-admin-black transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
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
      </div>

      {/* Blog Posts List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white border border-admin-border flex flex-col md:flex-row overflow-hidden group hover:border-admin-black transition-colors">
            <div className="w-full md:w-64 h-48 md:h-auto overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
              <img 
                src={post.image || "https://images.unsplash.com/photo-1541913080-21400ee8b244?auto=format&fit=crop&q=80&w=400"} 
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
                <button 
                  onClick={() => {
                    setNewBlog({
                      title: post.title,
                      author: post.author,
                      category: post.category,
                      status: post.status,
                      image: post.image,
                      content: post.content,
                      date: post.date
                    });
                    setEditingId(post.id);
                    setIsAddModalOpen(true);
                  }}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-admin-orange transition-colors"
                >
                  <Edit2 size={14} /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(post.id)}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-admin-black/80 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative bg-white border-4 border-admin-black w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in zoom-in duration-300">
            <div className="p-6 border-b-2 border-admin-black bg-admin-orange text-white flex justify-between items-center sticky top-0 z-10">
              <h2 className="text-2xl font-admin-header font-black uppercase tracking-tight">{editingId ? 'Edit' : 'Create'} Post</h2>
              <button onClick={() => setIsAddModalOpen(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Article Title</label>
                <input required className="w-full bg-admin-surface border-2 border-admin-black p-4 font-bold text-lg" value={newBlog.title} onChange={e => setNewBlog({...newBlog, title: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Category</label>
                  <select className="w-full bg-admin-surface border-2 border-admin-black p-4 font-bold" value={newBlog.category} onChange={e => setNewBlog({...newBlog, category: e.target.value})}>
                    <option>Industry</option>
                    <option>Safety</option>
                    <option>Company News</option>
                    <option>Design</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Featured Image URL</label>
                  <input className="w-full bg-admin-surface border-2 border-admin-black p-4 font-bold" value={newBlog.image} onChange={e => setNewBlog({...newBlog, image: e.target.value})} placeholder="https://..." />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Content (Markdown supported)</label>
                <textarea required className="w-full bg-admin-surface border-2 border-admin-black p-4 font-bold h-64" value={newBlog.content} onChange={e => setNewBlog({...newBlog, content: e.target.value})} />
              </div>
              <button type="submit" className="w-full bg-admin-black text-white py-5 font-bold uppercase tracking-widest hover:bg-admin-orange transition-colors shadow-xl">
                Deploy Article
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
