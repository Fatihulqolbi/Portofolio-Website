"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";

export const BackgroundLines = ({
  children,
  className,
  svgOptions,
}: {
  children: React.ReactNode;
  className?: string;
  svgOptions?: {
    duration?: number;
  };
}) => {
  return (
    <div
      className={cn(
        "h-screen w-full bg-transparent relative overflow-hidden",
        className
      )}
    >
      <SVG svgOptions={svgOptions} />
      {children}
    </div>
  );
};

const pathVariants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: (i: number) => ({
    pathLength: 1,
    opacity: [0, 0.5, 0],
    pathOffset: [0, 0.3, 0.6],
    transition: {
      pathLength: { duration: 2, delay: i * 0.1 },
      opacity: {
        duration: 4,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear" as const,
        delay: i * 0.2,
      },
      pathOffset: {
        duration: 6,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear" as const,
        delay: i * 0.2,
      },
    },
  }),
};


const SVG = ({
  svgOptions,
}: {
  svgOptions?: {
    duration?: number;
  };
}) => {
  const duration = svgOptions?.duration ?? 10;
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [paths, setPaths] = useState<string[]>([]);

  const generatePaths = useCallback(
    (width: number, height: number) => {
      const generatedPaths: string[] = [];
      const numberOfLines = 36;
      const lineSpacing = height / (numberOfLines + 1);

      for (let i = 0; i < numberOfLines; i++) {
        const y = lineSpacing * (i + 1);
        const amplitude = 20 + Math.random() * 30;
        const frequency = 0.003 + Math.random() * 0.004;
        const phase = Math.random() * Math.PI * 2;

        let d = `M 0 ${y}`;
        for (let x = 0; x <= width; x += 5) {
          const offsetY =
            Math.sin(x * frequency + phase) * amplitude +
            Math.sin(x * frequency * 2 + phase * 0.5) * (amplitude * 0.3);
          d += ` L ${x} ${y + offsetY}`;
        }
        generatedPaths.push(d);
      }
      return generatedPaths;
    },
    []
  );

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        setPaths(generatePaths(width, height));
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [generatePaths]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <AnimatePresence>
        {dimensions.width > 0 && (
          <svg
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full"
          >
            {paths.map((d, i) => (
              <motion.path
                key={`path-${i}`}
                d={d}
                stroke={`rgba(100, 255, 218, ${0.03 + (i % 5) * 0.01})`}
                strokeWidth={0.5 + (i % 3) * 0.2}
                strokeLinecap="round"
                variants={pathVariants}
                initial="initial"
                animate="animate"
                custom={i}
                style={{ filter: i % 4 === 0 ? "blur(0.5px)" : "none" }}
              />
            ))}
          </svg>
        )}
      </AnimatePresence>
    </div>
  );
};
