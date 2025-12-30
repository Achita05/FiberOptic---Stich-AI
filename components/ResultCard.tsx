
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hash, Scissors, ChevronRight, Search, Info } from 'lucide-react';
import { StitchResult } from '../types';

interface ResultCardProps {
  result: StitchResult;
  onReset: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  const [showSoon, setShowSoon] = useState(false);

  const handleLearnClick = () => {
    setShowSoon(true);
    setTimeout(() => setShowSoon(false), 3000);
  };

  return (
    <motion.div
      initial={{ y: 30, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      className="w-full max-w-xl"
    >
      <div className="bg-white rounded-3xl shadow-[0_32px_64px_-16px_rgba(49,46,129,0.15)] relative overflow-hidden border-t-[12px] border-pink-400">
        {/* Background Hashtag Ornament */}
        <div className="absolute top-6 right-6 text-indigo-50/50">
          <Hash size={100} strokeWidth={3} />
        </div>

        <div className="p-8 sm:p-10 relative">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex-1">
              <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-pink-500 bg-pink-50 px-3 py-1.5 rounded-full mb-3">
                Analysis Complete
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-indigo-950 leading-tight">
                {result.stitchName}
              </h2>
            </div>
            <div className="text-right ml-4">
              <span className="text-[10px] text-indigo-300 block font-bold uppercase tracking-wider mb-2">Confidence Match</span>
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#ebf2ff] border border-[#d6e4ff]">
                <span className="font-mono text-indigo-600 font-bold text-xl">{Math.round(result.confidence)}%</span>
              </div>
            </div>
          </div>

          {/* Project Identification */}
          <div className="bg-indigo-50/40 p-5 rounded-2xl border border-indigo-100/50 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Search className="w-4 h-4 text-indigo-400" />
              <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Project Type</h3>
            </div>
            <p className="text-indigo-950 font-bold text-xl capitalize">{result.projectName}</p>
          </div>

          {/* Technical Specs Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
              <p className="text-[9px] text-indigo-400 uppercase font-black tracking-widest mb-1">Recommended Hook</p>
              <p className="text-indigo-950 font-bold">{result.hookSize}</p>
            </div>
            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
              <p className="text-[9px] text-indigo-400 uppercase font-black tracking-widest mb-1">Yarn Thickness</p>
              <p className="text-indigo-950 font-bold">{result.yarnWeight}</p>
            </div>
          </div>

          {/* Reasoning & Visual Clues */}
          <div className="space-y-4 mb-10">
            <div className="bg-indigo-950/5 p-6 rounded-2xl border border-indigo-100/20">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-4 h-4 text-pink-400" />
                <h3 className="text-[10px] font-black text-pink-400 uppercase tracking-widest">Visual Evidence</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {result.primaryStitches.map((s, i) => (
                    <span key={i} className="text-[10px] bg-white border border-indigo-100 px-3 py-1 rounded-md text-indigo-950 font-bold shadow-sm capitalize">
                      {s}
                    </span>
                  ))}
                  {result.secondaryStitches && result.secondaryStitches.length > 0 && result.secondaryStitches[0].toLowerCase() !== "none" && result.secondaryStitches.map((s, i) => (
                    <span key={i} className="text-[10px] bg-pink-50 border border-pink-100 px-3 py-1 rounded-md text-pink-600 font-bold capitalize">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="relative pl-4 border-l-2 border-indigo-200">
                  <p className="text-indigo-900 text-xs leading-relaxed italic">
                    "{result.explanation}"
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-pink-50/30 p-4 rounded-2xl border border-pink-100/50">
              <p className="text-[9px] text-pink-400 uppercase font-black tracking-widest mb-2 text-center sm:text-left">Difficulty: {result.difficulty}</p>
              <div className="flex gap-1.5">
                {["Beginner", "Easy", "Intermediate", "Advanced", "Expert"].map((level, idx) => {
                   const levelNames = ["Beginner", "Easy", "Intermediate", "Advanced", "Expert"];
                   const isActive = levelNames.indexOf(result.difficulty) >= idx || (idx === 0);
                   return (
                     <div key={level} className={`h-2 flex-1 rounded-full transition-colors duration-500 ${isActive ? 'bg-pink-400' : 'bg-pink-100'}`} title={level} />
                   );
                })}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 relative">
            <AnimatePresence>
              {showSoon && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute -top-12 left-0 right-0 text-center"
                >
                  <span className="bg-indigo-950 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-xl">
                    Coming soon!!🧶
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={handleLearnClick}
              className="flex-[2] group bg-indigo-950 text-white py-5 px-8 rounded-2xl font-bold text-sm hover:bg-indigo-900 transition-all shadow-[0_20px_40px_-10px_rgba(49,46,129,0.3)] flex items-center justify-center gap-3 active:scale-95"
            >
              Learn Step-by-Step
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={onReset}
              className="flex-1 py-5 bg-gray-50 text-gray-500 rounded-2xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 border border-gray-100 active:scale-95"
            >
              <Scissors size={18} />
              <span className="text-sm font-bold">New Scan</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
