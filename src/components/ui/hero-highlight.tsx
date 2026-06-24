"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{ backgroundSize: "0% 2px" }}
      whileInView={{ backgroundSize: "100% 2px" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 1,
        ease: "easeInOut",
        delay: 0.3,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left bottom",
        backgroundImage:
          "linear-gradient(90deg, rgba(100,255,218,0.7), rgba(100,255,218,0.3))",
        display: "inline",
        paddingBottom: "2px",
      }}
      className={cn("relative inline", className)}
    >
      {children}
    </motion.span>
  );
};
