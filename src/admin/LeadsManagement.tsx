import React, { useState, useEffect } from "react";
import { 
  Search, 
  Mail, 
  Phone, 
  Clock, 
  Trash2,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Filter
} from "lucide-react";

export default function LeadsManagement() {
  const [leads, setLeads] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchLeads = () => {
    fetch('/api/get_data.php?type=leads')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setLeads(data);
      });
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = (id: number, newStatus: string) => {
    fetch('/api/save_data.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        type: 'leads', 
        action: 'update', 
        data: { id, status: newStatus } 
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) fetchLeads();
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      fetch('/api/save_data.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type: 'leads', action: 'delete' })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) fetchLeads();
      });
    }
  };

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.phone?.includes(searchTerm);
    const matchesStatus = statusFilter === "All" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">Business Inquiries</p>
          <h1 className="text-4xl md:text-5xl font-admin-header font-extrabold uppercase tracking-tight text-admin-black">
            Lead Management
          </h1>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Leads", value: leads.length, color: "bg-admin-black" },
          { label: "New", value: leads.filter(l => l.status === 'New').length, color: "bg-admin-orange" },
          { label: "Contacted", value: leads.filter(l => l.status === 'Contacted').length, color: "bg-blue-600" },
          { label: "Qualified", value: leads.filter(l => l.status === 'Qualified').length, color: "bg-green-600" },
        ].map((stat, i) => (
          <div key={i} className="bg-white border-2 border-admin-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">{stat.label}</p>
            <p className="text-4xl font-black text-admin-black">{stat.value}</p>
            <div className={`h-1 w-12 mt-4 ${stat.color}`} />
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 border border-admin-border">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search leads by name, email or phone..." 
            className="w-full bg-admin-surface border border-admin-border pl-12 pr-4 py-3 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-admin-orange transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative min-w-[200px]">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <select 
            className="w-full bg-admin-surface border border-admin-border pl-12 pr-4 py-3 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-admin-orange transition-colors appearance-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </select>
        </div>
      </div>

      {/* Leads Table/List */}
      <div className="bg-white border border-admin-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-admin-surface border-b border-admin-border">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Lead Info</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Inquiry Details</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-6">
                    <div className="space-y-1">
                      <p className="font-bold text-admin-black uppercase tracking-tight">{lead.name}</p>
                      <div className="flex flex-col gap-1">
                        <a href={`mailto:${lead.email}`} className="text-[10px] text-gray-500 hover:text-admin-orange flex items-center gap-1">
                          <Mail size={10} /> {lead.email}
                        </a>
                        <a href={`tel:${lead.phone}`} className="text-[10px] text-gray-500 hover:text-admin-orange flex items-center gap-1">
                          <Phone size={10} /> {lead.phone}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="max-w-md">
                      <span className="text-[9px] font-black uppercase tracking-widest text-admin-orange bg-admin-orange/5 px-2 py-0.5 rounded-full mb-2 inline-block">
                        {lead.service}
                      </span>
                      <p className="text-xs text-gray-600 line-clamp-2 italic">"{lead.message}"</p>
                      <div className="flex items-center gap-2 mt-2 text-[9px] text-gray-400 uppercase tracking-widest font-bold">
                        <Clock size={10} /> {new Date(lead.submitted_at).toLocaleString()}
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <select 
                      className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 border-2 ${
                        lead.status === 'New' ? 'bg-admin-orange text-white border-admin-orange' :
                        lead.status === 'Contacted' ? 'bg-blue-600 text-white border-blue-600' :
                        lead.status === 'Qualified' ? 'bg-green-600 text-white border-green-600' :
                        'bg-gray-100 text-gray-400 border-gray-200'
                      }`}
                      value={lead.status}
                      onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Lost">Lost</option>
                    </select>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleDelete(lead.id)}
                        className="p-2 text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete Lead"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-20 text-center">
                    <AlertCircle className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">No leads found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
