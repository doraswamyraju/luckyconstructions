import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const getImageUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith('http') || url.startsWith('https') || url.startsWith('/')) return url;
  return `/uploads/${url}`;
};

interface ProjectDetailModalProps {
  project: any;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const media = project.media && project.media.length > 0 
    ? project.media 
    : [{ url: project.image_url, type: 'image' }];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  }, [media.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  }, [media.length]);

  useEffect(() => {
    if (media.length <= 1) return;
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, [handleNext, media.length]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-brand-black/95 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-white text-brand-black w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 bg-brand-black text-white hover:bg-brand-gold hover:text-brand-black transition-colors"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 h-full overflow-y-auto lg:overflow-hidden">
          {/* Gallery Area - Horizontal Auto-Slider */}
          <div className="bg-gray-100 h-[400px] lg:h-auto relative overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full h-full"
              >
                {media[currentIndex].type === 'video' ? (
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <video controls className="w-full h-full object-contain" autoPlay muted loop>
                      <source src={getImageUrl(media[currentIndex].url)} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  <img 
                    src={getImageUrl(media[currentIndex].url)} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {media.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {media.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                  className={`h-1.5 transition-all duration-300 ${currentIndex === i ? 'w-8 bg-brand-gold' : 'w-2 bg-white/50 hover:bg-white'}`}
                />
              ))}
            </div>
          </div>

          {/* Details Area */}
          <div className="p-8 md:p-12 flex flex-col justify-between bg-white overflow-y-auto">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-brand-gold text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">
                  {project.category}
                </span>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                  Project ID: LC-{project.id?.toString().padStart(3, '0')}
                </span>
              </div>

              <h3 className="text-2xl md:text-4xl font-display font-bold uppercase tracking-tight leading-[1.1] mb-6">
                {project.title}
              </h3>

              <div className="space-y-6">
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {project.description || "Lucky Constructions delivered this project with a focus on structural integrity and architectural finesse. Every detail was meticulously planned and executed by our senior engineering team."}
                </p>
                
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Location</p>
                    <div className="flex items-center gap-2 font-bold text-xs uppercase">
                      <MapPin size={14} className="text-brand-gold" />
                      {project.location}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Timeline</p>
                    <div className="flex items-center gap-2 font-bold text-xs uppercase">
                      <Clock size={14} className="text-brand-gold" />
                      {project.status === 'Completed' ? `Completed ${project.year}` : `${project.completion_percentage}% Progress`}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <button 
                onClick={onClose}
                className="w-full bg-brand-black text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-brand-gold hover:text-brand-black transition-colors flex items-center justify-center gap-2 shadow-xl"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
