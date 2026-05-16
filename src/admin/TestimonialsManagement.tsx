import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Star, 
  CheckCircle2, 
  Clock, 
  EyeOff, 
  Edit2, 
  Trash2,
  Quote,
  X
} from "lucide-react";

export default function TestimonialsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    role: "",
    project: "",
    text: "",
    rating: 5,
    status: "Approved",
    visible: true,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchTestimonials = () => {
    fetch('/api/get_data.php?type=testimonials')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setTestimonials(data);
      });
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const action = editingId ? 'update' : 'add';
    fetch('/api/save_data.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        type: 'testimonials', 
        action: action, 
        data: { ...newTestimonial, id: editingId } 
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setIsAddModalOpen(false);
        fetchTestimonials();
      }
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this testimonial?")) {
      fetch('/api/save_data.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type: 'testimonials', action: 'delete' })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) fetchTestimonials();
      });
    }
  };

  const filteredTestimonials = testimonials.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.project?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">Feedback & Trust</p>
          <h1 className="text-4xl md:text-5xl font-admin-header font-extrabold uppercase tracking-tight text-admin-black">
            Testimonials
          </h1>
        </div>
        <button 
          onClick={() => {
            setNewTestimonial({
              name: "",
              role: "",
              project: "",
              text: "",
              rating: 5,
              status: "Approved",
              visible: true,
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            });
            setEditingId(null);
            setIsAddModalOpen(true);
          }}
          className="bg-admin-orange text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-admin-black transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <Plus size={18} /> Add New Review
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 border border-admin-border relative">
        <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search reviews by name or project..." 
          className="w-full bg-admin-surface border border-admin-border pl-12 pr-4 py-3 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-admin-orange transition-colors"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Testimonials List */}
      <div className="space-y-4">
        {filteredTestimonials.map((t) => (
          <div key={t.id} className="bg-white border border-admin-border flex flex-col md:flex-row group hover:border-admin-black transition-colors">
            <div className="w-2 bg-admin-black shrink-0 group-hover:bg-admin-orange transition-colors" />
            
            <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Author Info */}
              <div className="lg:col-span-1 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-admin-black text-white flex items-center justify-center font-bold text-xl shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-admin-black uppercase tracking-tight">{t.name}</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed mt-1">
                      {t.role} <br /> {t.project}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 text-admin-orange">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < t.rating ? "currentColor" : "none"} />
                  ))}
                </div>
              </div>

              {/* Review Content */}
              <div className="lg:col-span-2 relative">
                <Quote className="absolute -top-4 -left-4 text-gray-100" size={48} />
                <p className="text-sm text-gray-600 italic leading-relaxed relative z-10">
                  "{t.text}"
                </p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-4">Submitted on {t.date}</p>
              </div>

              {/* Status & Actions */}
              <div className="lg:col-span-1 flex flex-col justify-between items-end gap-6">
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 flex items-center gap-2 ${
                    t.status === "Approved" ? "bg-green-100 text-green-800" : "bg-admin-orange/10 text-admin-orange"
                  }`}>
                    {t.status === "Approved" ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                    {t.status}
                  </span>
                  {t.visible ? (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-admin-black flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500" /> Public
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <EyeOff size={12} /> Hidden
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setNewTestimonial({
                        name: t.name,
                        role: t.role,
                        project: t.project,
                        text: t.text,
                        rating: t.rating,
                        status: t.status,
                        visible: t.visible,
                        date: t.date
                      });
                      setEditingId(t.id);
                      setIsAddModalOpen(true);
                    }}
                    className="px-4 py-2 border border-admin-black text-[10px] font-bold uppercase tracking-widest hover:bg-admin-black hover:text-white transition-all flex items-center gap-2"
                  >
                    <Edit2 size={12} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(t.id)}
                    className="px-4 py-2 bg-red-50 text-red-500 border border-red-200 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-admin-black/80 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative bg-white border-4 border-admin-black w-full max-w-2xl animate-in zoom-in duration-300">
            <div className="p-6 border-b-2 border-admin-black bg-admin-orange text-white flex justify-between items-center">
              <h2 className="text-2xl font-admin-header font-black uppercase tracking-tight">{editingId ? 'Edit' : 'Add'} Testimonial</h2>
              <button onClick={() => setIsAddModalOpen(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Client Name</label>
                  <input required className="w-full bg-admin-surface border-2 border-admin-black p-3 text-sm font-bold" value={newTestimonial.name} onChange={e => setNewTestimonial({...newTestimonial, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Role/Company</label>
                  <input className="w-full bg-admin-surface border-2 border-admin-black p-3 text-sm font-bold" value={newTestimonial.role} onChange={e => setNewTestimonial({...newTestimonial, role: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Project Name</label>
                <input className="w-full bg-admin-surface border-2 border-admin-black p-3 text-sm font-bold" value={newTestimonial.project} onChange={e => setNewTestimonial({...newTestimonial, project: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Review Text</label>
                <textarea required className="w-full bg-admin-surface border-2 border-admin-black p-3 text-sm font-bold h-32" value={newTestimonial.text} onChange={e => setNewTestimonial({...newTestimonial, text: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Rating (1-5)</label>
                  <input type="number" min="1" max="5" className="w-full bg-admin-surface border-2 border-admin-black p-3 text-sm font-bold" value={newTestimonial.rating} onChange={e => setNewTestimonial({...newTestimonial, rating: parseInt(e.target.value)})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</label>
                  <select className="w-full bg-admin-surface border-2 border-admin-black p-3 text-sm font-bold" value={newTestimonial.status} onChange={e => setNewTestimonial({...newTestimonial, status: e.target.value})}>
                    <option>Approved</option>
                    <option>Pending</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-admin-black text-white py-4 font-bold uppercase tracking-widest hover:bg-admin-orange transition-colors">
                Save Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
