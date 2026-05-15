import React, { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  MapPin, 
  Building2,
  X,
  Star
} from "lucide-react";

export default function ProjectsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [projects, setProjects] = useState<any[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    category: "Commercial",
    location: "",
    status: "Ongoing",
    completion_percentage: 0,
    year: "2024",
    is_featured: false,
    description: "",
    media: [] as { url: string; type: 'image' | 'video'; is_main: boolean; inputMode?: 'upload' | 'url' }[]
  });
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);

  const fetchProjects = () => {
    fetch('/api/get_data.php?type=projects')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setProjects(data);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddMedia = () => {
    setNewProject({
      ...newProject,
      media: [...newProject.media, { url: "", type: "image", is_main: newProject.media.length === 0, inputMode: 'upload' }]
    });
  };

  const handleMediaChange = (index: number, field: string, value: any) => {
    const updatedMedia = [...newProject.media];
    if (field === 'is_main' && value === true) {
      updatedMedia.forEach((m, i) => m.is_main = i === index);
    } else {
      (updatedMedia[index] as any)[field] = value;
    }
    setNewProject({ ...newProject, media: updatedMedia });
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const action = editingProjectId ? 'update' : 'add';
    fetch('/api/save_data.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        type: 'projects', 
        action: action, 
        data: { ...newProject, id: editingProjectId } 
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setIsAddModalOpen(false);
        fetchProjects();
          year: "2024",
          description: "",
          media: []
        });
      }
    });
  };

  const handleDeleteProject = (id: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      fetch('/api/save_data.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type: 'project', action: 'delete' })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) fetchProjects();
      });
    }
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">Portfolio Control</p>
          <h1 className="text-4xl md:text-5xl font-admin-header font-extrabold uppercase tracking-tight text-admin-black">
            Project Management
          </h1>
        </div>
        <button 
          onClick={() => {
            setNewProject({
              title: "",
              category: "Commercial",
              location: "",
              status: "Ongoing",
              completion_percentage: 0,
              year: "2024",
              description: "",
              media: []
            });
            setEditingProjectId(null);
            setIsAddModalOpen(true);
          }}
          className="bg-admin-orange text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-admin-black transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <Plus size={18} /> Add New Project
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 border border-admin-border">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search projects by name or location..." 
            className="w-full bg-admin-surface border border-admin-border pl-12 pr-4 py-3 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-admin-orange transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <div className="relative min-w-[160px]">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select 
              className="w-full bg-admin-surface border border-admin-border pl-12 pr-4 py-3 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-admin-orange transition-colors appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white border-2 border-admin-black flex flex-col group shadow-lg">
            <div className="p-6 flex-1 space-y-6">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-admin-black text-white">
                      {project.category}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 border border-admin-black ${
                      project.status === "Completed" ? "bg-green-100 text-green-800" : "bg-admin-orange/10 text-admin-orange"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-admin-header font-black uppercase tracking-tight text-admin-black leading-tight">
                    {project.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin size={14} className="text-admin-orange" />
                  <span className="text-xs font-bold uppercase tracking-widest">{project.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Building2 size={14} className="text-admin-orange" />
                  <span className="text-xs font-bold uppercase tracking-widest">{project.year} Completion</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Construction Progress</span>
                  <span className="text-xs font-bold text-admin-black">{project.completion_percentage}%</span>
                </div>
                <div className="h-4 bg-admin-surface border border-admin-border relative overflow-hidden">
                  <div 
                    className={`absolute top-0 left-0 h-full transition-all duration-1000 ${
                      project.status === "Completed" ? "bg-admin-black" : "bg-admin-orange"
                    }`}
                    style={{ width: `${project.completion_percentage}%` }}
                  >
                    <div className="w-full h-full opacity-20 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-admin-black grid grid-cols-2 divide-x-2 divide-admin-black">
              <button 
                onClick={() => {
                  setNewProject({
                    title: project.title,
                    category: project.category,
                    location: project.location,
                    status: project.status,
                    completion_percentage: project.completion_percentage,
                    year: project.year,
                    description: project.description,
                    media: project.media || []
                  });
                  setEditingProjectId(project.id);
                  setIsAddModalOpen(true);
                }}
                className="p-4 hover:bg-admin-surface transition-colors flex items-center justify-center gap-2 group/btn"
              >
                <Edit2 size={16} className="group-hover/btn:text-admin-orange" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Edit</span>
              </button>
              <button 
                onClick={() => handleDeleteProject(project.id)}
                className="p-4 hover:bg-red-50 text-red-500 transition-colors flex items-center justify-center gap-2 group/btn"
              >
                <Trash2 size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-admin-black/80 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative bg-white border-4 border-admin-black w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in zoom-in duration-300 shadow-2xl">
            <div className="p-8 border-b-2 border-admin-black bg-admin-orange text-white sticky top-0 z-10 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-admin-header font-black uppercase tracking-tight">Configure New Project</h2>
                <p className="text-xs font-bold uppercase tracking-widest opacity-80 mt-1">Structural Asset Registry</p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-white/20 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSaveProject} className="p-8 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Basic Details */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-admin-orange border-b border-admin-border pb-2">Core Specifications</h4>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Project Title</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-admin-surface border-2 border-admin-black p-4 font-bold uppercase tracking-widest text-sm focus:outline-none focus:bg-white transition-colors"
                      value={newProject.title}
                      onChange={e => setNewProject({...newProject, title: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Category</label>
                      <select 
                        className="w-full bg-admin-surface border-2 border-admin-black p-4 font-bold uppercase tracking-widest text-sm focus:outline-none focus:bg-white transition-colors appearance-none"
                        value={newProject.category}
                        onChange={e => setNewProject({...newProject, category: e.target.value})}
                      >
                        <option>Residential</option>
                        <option>Commercial</option>
                        <option>Industrial</option>
                        <option>Infrastructure</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</label>
                      <select 
                        className="w-full bg-admin-surface border-2 border-admin-black p-4 font-bold uppercase tracking-widest text-sm focus:outline-none focus:bg-white transition-colors appearance-none"
                        value={newProject.status}
                        onChange={e => setNewProject({...newProject, status: e.target.value})}
                      >
                        <option>Ongoing</option>
                        <option>Completed</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Completion Year</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-admin-surface border-2 border-admin-black p-4 font-bold uppercase tracking-widest text-sm focus:outline-none focus:bg-white transition-colors"
                        value={newProject.year}
                        onChange={e => setNewProject({...newProject, year: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Progress (%)</label>
                      <input 
                        required
                        type="number" 
                        min="0"
                        max="100"
                        className="w-full bg-admin-surface border-2 border-admin-black p-4 font-bold uppercase tracking-widest text-sm focus:outline-none focus:bg-white transition-colors"
                        value={newProject.completion_percentage}
                        onChange={e => setNewProject({...newProject, completion_percentage: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Location</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-admin-surface border-2 border-admin-black p-4 font-bold uppercase tracking-widest text-sm focus:outline-none focus:bg-white transition-colors"
                      value={newProject.location}
                      onChange={e => setNewProject({...newProject, location: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Project Overview</label>
                    <textarea 
                      required
                      className="w-full bg-admin-surface border-2 border-admin-black p-4 font-bold uppercase tracking-widest text-sm focus:outline-none focus:bg-white transition-colors h-32"
                      value={newProject.description}
                      onChange={e => setNewProject({...newProject, description: e.target.value})}
                    />
                  </div>
                </div>

                {/* Media Management */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-admin-border pb-2">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-admin-orange">Multimedia Gallery</h4>
                    <button 
                      type="button"
                      onClick={handleAddMedia}
                      className="bg-admin-black text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest hover:bg-admin-orange transition-colors"
                    >
                      + Add Item
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {newProject.media.length === 0 && (
                      <div className="border-2 border-dashed border-admin-border p-10 text-center">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">No media added yet</p>
                      </div>
                    )}
                    {newProject.media.map((item, idx) => (
                      <div key={idx} className="p-4 bg-admin-surface border-2 border-admin-black space-y-4 relative">
                        <div className="flex gap-2 items-center">
                          <select 
                            className="bg-white border-2 border-admin-black p-2 font-bold uppercase tracking-widest text-[10px]"
                            value={item.type}
                            onChange={e => handleMediaChange(idx, 'type', e.target.value)}
                          >
                            <option value="image">Photo</option>
                            <option value="video">Video</option>
                          </select>
                          
                          <div className="flex-1 space-y-2">
                            <div className="flex gap-2 p-1 bg-white border border-admin-border w-fit">
                              <button 
                                type="button"
                                onClick={() => handleMediaChange(idx, 'inputMode', 'upload')}
                                className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest transition-colors ${!item.inputMode || item.inputMode === 'upload' ? 'bg-admin-black text-white' : 'text-gray-400 hover:text-admin-black'}`}
                              >
                                Upload
                              </button>
                              <button 
                                type="button"
                                onClick={() => handleMediaChange(idx, 'inputMode', 'url')}
                                className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest transition-colors ${item.inputMode === 'url' ? 'bg-admin-black text-white' : 'text-gray-400 hover:text-admin-black'}`}
                              >
                                URL
                              </button>
                            </div>

                            {item.inputMode === 'url' ? (
                              <input 
                                type="text" 
                                placeholder="Paste Image/Video URL here..."
                                className="w-full bg-white border-2 border-admin-black p-2 font-bold uppercase tracking-widest text-[10px] focus:border-admin-orange outline-none"
                                value={item.url}
                                onChange={e => handleMediaChange(idx, 'url', e.target.value)}
                              />
                            ) : (
                              <div className="flex-1 flex gap-2">
                                {item.url ? (
                                  <div className="flex-1 flex items-center justify-between gap-2 bg-white border-2 border-admin-black p-2 text-[10px] font-bold text-green-600">
                                    <span className="truncate">READY: {item.url}</span>
                                    <button onClick={() => handleMediaChange(idx, 'url', '')} className="text-gray-400 hover:text-red-500">Change</button>
                                  </div>
                                ) : (
                                  <input 
                                    type="file"
                                    accept={item.type === 'image' ? "image/*" : "video/*"}
                                    className="flex-1 bg-white border-2 border-admin-black p-2 font-bold uppercase tracking-widest text-[10px] file:hidden cursor-pointer"
                                    onChange={async (e) => {
                                      const file = e.target.files?.[0];
                                      if (!file) return;
                                      const formData = new FormData();
                                      formData.append('file', file);
                                      const res = await fetch('/api/upload.php', { method: 'POST', body: formData });
                                      const data = await res.json();
                                      if (data.success) handleMediaChange(idx, 'url', data.url);
                                    }}
                                  />
                                )}
                              </div>
                            )}
                          </div>

                          <button 
                            type="button"
                            onClick={() => {
                              const updated = newProject.media.filter((_, i) => i !== idx);
                              setNewProject({...newProject, media: updated});
                            }}
                            className="p-2 text-red-500 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 cursor-pointer group">
                            <input 
                              type="checkbox" 
                              checked={item.is_main}
                              onChange={e => handleMediaChange(idx, 'is_main', e.target.checked)}
                              className="w-4 h-4 accent-admin-orange border-2 border-admin-black"
                            />
                            <div className="flex items-center gap-1.5">
                              <Star size={12} className={item.is_main ? "text-admin-orange fill-admin-orange" : "text-gray-400"} />
                              <span className={`text-[10px] font-bold uppercase tracking-widest ${item.is_main ? "text-admin-orange" : "text-gray-400 group-hover:text-admin-black"}`}>
                                Primary Image (Homepage)
                              </span>
                            </div>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t-2 border-admin-black">
                <button 
                  type="button" 
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 border-2 border-admin-black py-5 font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition-colors"
                >
                  Discard Changes
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-admin-black text-white py-5 font-bold uppercase tracking-widest text-sm hover:bg-admin-orange transition-colors shadow-xl"
                >
                  Deploy Project Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
