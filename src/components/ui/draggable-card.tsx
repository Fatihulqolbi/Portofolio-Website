"use client";

import React, { useRef, createContext, useContext } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const DragContext = createContext<any>(null);

export const DraggableCardContainer = ({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <DragContext.Provider value={containerRef}>
      <div ref={containerRef} className={cn("relative", className)} style={style}>
        {children}
      </div>
    </DragContext.Provider>
  );
};

export const DraggableCardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useContext(DragContext);

  return (
    <motion.div
      drag
      dragConstraints={containerRef || { left: -1000, right: 1000, top: -1000, bottom: 1000 }}
      whileDrag={{ scale: 1.05, zIndex: 50, cursor: "grabbing" }}
      whileHover={{ scale: 1.02 }}
      className={cn("absolute cursor-grab", className)}
    >
      {children}
    </motion.div>
  );
};
