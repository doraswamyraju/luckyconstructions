import React, { useState } from "react";
import { Lock, Mail, User, ArrowRight, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    fetch('/api/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem("adminUser", JSON.stringify(data.user));
        navigate("/admin");
      } else {
        setError(data.error || "Login failed");
      }
    })
    .catch(() => setError("Server error. Please try again."));
  };

  const handleResetRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage("");
    setError("");

    fetch('/api/reset_password.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: resetEmail })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setResetMessage(data.message);
      } else {
        setError(data.error || "Reset failed");
      }
    });
  };

  return (
    <div className="min-h-screen bg-admin-black flex items-center justify-center p-6 font-admin-body">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-admin-orange blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-admin-orange blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Brand Area */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-admin-orange rounded-2xl mb-6 shadow-2xl rotate-3">
             <ShieldCheck className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-admin-header font-black text-white uppercase tracking-tighter">
            LUCKY <span className="text-admin-orange">ADMIN</span>
          </h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">Industrial Infrastructure Management</p>
        </div>

        <div className="bg-white border-b-8 border-admin-orange p-8 md:p-10 shadow-2xl">
          {!isResetMode ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    required
                    type="text" 
                    className="w-full bg-gray-50 border-2 border-transparent border-b-gray-100 p-4 pl-12 font-bold uppercase tracking-widest text-sm focus:outline-none focus:border-b-admin-orange focus:bg-white transition-all text-admin-black"
                    placeholder="ADMIN ID"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Password</label>
                  <button 
                    type="button"
                    onClick={() => setIsResetMode(true)}
                    className="text-[10px] font-bold uppercase tracking-widest text-admin-orange hover:text-admin-black"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    required
                    type="password" 
                    className="w-full bg-gray-50 border-2 border-transparent border-b-gray-100 p-4 pl-12 font-bold uppercase tracking-widest text-sm focus:outline-none focus:border-b-admin-orange focus:bg-white transition-all text-admin-black"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-500 p-4 text-xs font-bold uppercase tracking-widest border-l-4 border-red-500">
                  {error}
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-admin-black text-white py-5 font-bold uppercase tracking-widest text-sm hover:bg-admin-orange transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98]"
              >
                Authenticate Access <ArrowRight size={18} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetRequest} className="space-y-6 animate-in slide-in-from-right duration-300">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Recovery Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    required
                    type="email" 
                    className="w-full bg-gray-50 border-2 border-transparent border-b-gray-100 p-4 pl-12 font-bold uppercase tracking-widest text-sm focus:outline-none focus:border-b-admin-orange focus:bg-white transition-all text-admin-black"
                    placeholder="ENTER REGISTERED EMAIL"
                    value={resetEmail}
                    onChange={e => setResetEmail(e.target.value)}
                  />
                </div>
              </div>

              {resetMessage && (
                <div className="bg-green-50 text-green-600 p-4 text-xs font-bold uppercase tracking-widest border-l-4 border-green-500">
                  {resetMessage}
                </div>
              )}

              {error && (
                <div className="bg-red-50 text-red-500 p-4 text-xs font-bold uppercase tracking-widest border-l-4 border-red-500">
                  {error}
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-admin-orange text-white py-5 font-bold uppercase tracking-widest text-sm hover:bg-admin-black transition-all flex items-center justify-center gap-3 shadow-xl"
              >
                Send Recovery Link <Mail size={18} />
              </button>

              <button 
                type="button"
                onClick={() => setIsResetMode(false)}
                className="w-full text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-admin-black transition-colors"
              >
                Return to Login
              </button>
            </form>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">
            &copy; 2024 LUCKY CONSTRUCTIONS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </div>
  );
}
