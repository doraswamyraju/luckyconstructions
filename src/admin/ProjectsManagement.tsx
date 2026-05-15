import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  MapPin, 
  Building2 
} from "lucide-react";

// Live data from API replaces mock constants

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
    completion: 0,
    year: "2024",
    description: "",
    image_url: "",
    media: [] as { url: string; type: 'image' | 'video'; is_main: boolean }[]
  });

  const fetchProjects = () => {
    fetch('/api/get_data.php?type=projects')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setProjects(data);
      });
  };

  React.useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    // Ensure at least one main image if media exists
    const finalMedia = [...newProject.media];
    if (newProject.image_url && !finalMedia.find(m => m.is_main)) {
      finalMedia.unshift({ url: newProject.image_url, type: 'image', is_main: true });
    }

    fetch('/api/save_data.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newProject, media: finalMedia, type: 'project', action: 'add' })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setIsAddModalOpen(false);
        fetchProjects();
        setNewProject({ title: "", category: "Commercial", location: "", status: "Ongoing", completion: 0, year: "2024", description: "", image_url: "", media: [] });
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
          onClick={() => setIsAddModalOpen(true)}
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
          <div key={project.id} className="bg-white border-2 border-admin-black flex flex-col group">
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
                  <span className="text-xs font-bold uppercase tracking-widest">{project.year} Est. Build</span>
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

            <div className="border-t-2 border-admin-black grid grid-cols-3 divide-x-2 divide-admin-black">
              <button className="p-4 hover:bg-admin-surface transition-colors flex items-center justify-center gap-2 group/btn">
                <Eye size={16} className="group-hover/btn:text-admin-orange" />
                <span className="text-[10px] font-bold uppercase tracking-widest">View</span>
              </button>
              <button className="p-4 hover:bg-admin-surface transition-colors flex items-center justify-center gap-2 group/btn">
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
          <div className="relative bg-white border-4 border-admin-black w-full max-w-2xl animate-in zoom-in duration-300">
            <div className="p-8 border-b-2 border-admin-black bg-admin-orange text-white">
              <h2 className="text-3xl font-admin-header font-black uppercase tracking-tight">Add New Project</h2>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 mt-2">Industrial Structural Management</p>
            </div>
            <form onSubmit={handleAddProject} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Project Title</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-admin-surface border-2 border-admin-black p-3 font-bold uppercase tracking-widest text-sm focus:outline-none focus:bg-white transition-colors"
                    value={newProject.title}
                    onChange={e => setNewProject({...newProject, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Category</label>
                  <select 
                    className="w-full bg-admin-surface border-2 border-admin-black p-3 font-bold uppercase tracking-widest text-sm focus:outline-none focus:bg-white transition-colors"
                    value={newProject.category}
                    onChange={e => setNewProject({...newProject, category: e.target.value})}
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Residential">Residential</option>
                    <option value="Infrastructure">Infrastructure</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Location</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-admin-surface border-2 border-admin-black p-3 font-bold uppercase tracking-widest text-sm focus:outline-none focus:bg-white transition-colors"
                    value={newProject.location}
                    onChange={e => setNewProject({...newProject, location: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Status</label>
                  <select 
                    className="w-full bg-admin-surface border-2 border-admin-black p-3 font-bold uppercase tracking-widest text-sm focus:outline-none focus:bg-white transition-colors"
                    value={newProject.status}
                    onChange={e => setNewProject({...newProject, status: e.target.value})}
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Project Gallery (Photos & Videos)</label>
                    <button 
                      type="button"
                      onClick={() => setNewProject({...newProject, media: [...newProject.media, { url: "", type: "image", is_main: false }]})}
                      className="text-[10px] font-bold uppercase tracking-widest text-admin-orange hover:text-admin-black"
                    >
                      + Add Media
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex gap-2">
                       <input 
                        placeholder="Main Image URL (This shows on Home Page)"
                        className="flex-1 bg-admin-surface border-2 border-admin-black p-3 font-bold uppercase tracking-widest text-sm focus:outline-none focus:bg-white transition-colors"
                        value={newProject.image_url}
                        onChange={e => setNewProject({...newProject, image_url: e.target.value})}
                      />
                    </div>
                    {newProject.media.map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input 
                          placeholder="Media URL"
                          className="flex-1 bg-admin-surface border-2 border-admin-black p-3 font-bold uppercase tracking-widest text-sm focus:outline-none focus:bg-white transition-colors"
                          value={item.url}
                          onChange={e => {
                            const updated = [...newProject.media];
                            updated[idx].url = e.target.value;
                            setNewProject({...newProject, media: updated});
                          }}
                        />
                        <select 
                          className="bg-admin-surface border-2 border-admin-black p-3 font-bold uppercase tracking-widest text-xs"
                          value={item.type}
                          onChange={e => {
                            const updated = [...newProject.media];
                            updated[idx].type = e.target.value as 'image' | 'video';
                            setNewProject({...newProject, media: updated});
                          }}
                        >
                          <option value="image">Image</option>
                          <option value="video">Video</option>
                        </select>
                        <button 
                          type="button"
                          onClick={() => {
                            const updated = newProject.media.filter((_, i) => i !== idx);
                            setNewProject({...newProject, media: updated});
                          }}
                          className="p-3 text-red-500 border-2 border-admin-black"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 border-2 border-admin-black py-4 font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-admin-black text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-admin-orange transition-colors"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
