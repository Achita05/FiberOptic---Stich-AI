
import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

interface ScanningOverlayProps {
  image: string;
}

const ScanningOverlay: React.FC<ScanningOverlayProps> = ({ image }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl"
    >
      <img src={image} className="w-full h-full object-cover grayscale opacity-50" alt="Scanning" />
      
      {/* Scan Line Animation */}
      <motion.div 
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent z-10 shadow-[0_0_20px_rgba(244,114,182,0.9)]"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-900/30 backdrop-blur-[4px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          className="relative w-28 h-28"
        >
          {[...Array(3)].map((_, i) => (
            <motion.span 
              key={i}
              className="absolute inset-0 border-2 border-white/40 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 2.5, delay: i * 0.6, repeat: Infinity }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <RefreshCw className="w-10 h-10 text-white animate-spin-slow" />
          </div>
        </motion.div>
        
        <div className="mt-8 text-center">
          <p className="text-white font-bold tracking-[0.3em] text-xs uppercase mb-2">Unravelling Pattern</p>
          <div className="flex gap-1 justify-center">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-1.5 h-1.5 bg-white rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ScanningOverlay;
