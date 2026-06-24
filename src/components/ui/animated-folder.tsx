"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MoreVertical, Settings, Folder as FolderIcon, Calendar } from "lucide-react";

interface AnimatedFolderProps {
  title: string;
  filesCount: number;
  items: { text: string; date?: string; highlighted?: boolean }[];
  color?: string;
  isActive?: boolean;
  onHover?: () => void;
  onClick?: () => void;
}

export function AnimatedFolder({ 
  title, 
  filesCount, 
  items, 
  color = "var(--color-accent)",
  isActive = false,
  onHover,
  onClick
}: AnimatedFolderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isOpen = isHovered || isActive;

  return (
    <div 
      className="relative w-full max-w-sm h-72 mx-auto cursor-pointer"
      style={{ perspective: "1200px" }}
      onMouseEnter={() => {
        setIsHovered(true);
        if (onHover) onHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Folder Back */}
      <div 
        className="absolute bottom-0 w-full h-[85%] rounded-xl rounded-tl-none transition-all duration-300"
        style={{ backgroundColor: color, opacity: 0.85 }}
      />
      {/* Folder Tab (Top Left) */}
      <div 
        className="absolute top-[4%] left-0 w-32 h-[15%] rounded-t-xl transition-all duration-300"
        style={{ backgroundColor: color, opacity: 0.85 }}
      />
      
      {/* Paper inside */}
      <motion.div 
        className="absolute bottom-6 left-4 right-4 bg-white rounded-md shadow-inner flex flex-col p-4 text-black overflow-hidden"
        initial={{ y: 0, height: "70%" }}
        animate={{ 
          y: isOpen ? -45 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ zIndex: 1, height: "75%" }}
      >
        <div className="flex items-center gap-2 mb-3 border-b border-gray-200 pb-2">
          <span className="font-bold text-sm">Experience Details</span>
        </div>
        <ul className="space-y-3 text-xs flex-1 overflow-y-auto pr-1 custom-scrollbar">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <div className="mt-0.5 shrink-0">
                <input type="checkbox" readOnly checked={item.highlighted} className="w-3 h-3 accent-blue-500" />
              </div>
              <span className={`text-gray-700 ${item.highlighted ? "font-semibold" : ""}`}>
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
      
      {/* Folder Front Flap */}
      <motion.div 
        className="absolute bottom-0 w-full h-[85%] rounded-xl rounded-tl-none shadow-2xl flex flex-col justify-between p-5 origin-bottom"
        initial={{ rotateX: 0 }}
        animate={{ rotateX: isOpen ? -25 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ 
          backgroundColor: color, 
          zIndex: 2,
          color: "var(--color-surface)", // Dark text for the hacker green folder
        }}
      >
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-2xl flex items-center gap-2 drop-shadow-sm">
            {title}
          </h3>
          <div className="flex gap-2">
            <MoreVertical size={18} className="opacity-70 hover:opacity-100 transition-opacity" />
            <Settings size={18} className="opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </div>
        
        <div className="mt-auto">
          <p className="font-semibold text-sm opacity-90 mb-1">Notes & Files</p>
          <p className="text-xs opacity-75 font-mono">{filesCount} Files</p>
        </div>
      </motion.div>
    </div>
  );
}
