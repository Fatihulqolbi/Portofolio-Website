"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/Animations";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0c14] flex flex-col items-center justify-center relative overflow-hidden selection:bg-[var(--color-accent)] selection:text-[#0a0c14]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-[var(--color-accent)] opacity-[0.03] blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[25vw] h-[25vw] rounded-full bg-[var(--color-accent)] opacity-[0.02] blur-[100px]"></div>
      </div>

      <style>{`
        .my-custom-face-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 250px;
          background: transparent;
          color: #ffffff;
          position: relative;
          z-index: 10;
        }

        .my-custom-face-container .face {
          width: 180px;
          overflow: visible;
        }

        .my-custom-face-container .face__eyes,
        .my-custom-face-container .face__eye-lid,
        .my-custom-face-container .face__mouth-left,
        .my-custom-face-container .face__mouth-right,
        .my-custom-face-container .face__nose,
        .my-custom-face-container .face__pupil {
          animation: eyes 1s 0.3s forwards;
        }

        .my-custom-face-container .face__eye-lid,
        .my-custom-face-container .face__pupil {
          animation-duration: 4s;
          animation-delay: 1.3s;
          animation-iteration-count: infinite;
        }

        .my-custom-face-container .face__eye-lid {
          animation-name: eye-lid;
        }
        .my-custom-face-container .face__mouth-left {
          animation-name: mouth-left;
        }
        .my-custom-face-container .face__mouth-right {
          animation-name: mouth-right;
        }
        .my-custom-face-container .face__nose {
          animation-name: nose;
        }
        .my-custom-face-container .face__pupil {
          animation-name: pupil;
        }

        @keyframes eye-lid {
          0%, 40%, 45%, 100% { transform: translateY(0); }
          42.5% { transform: translateY(17.5px); }
        }

        @keyframes eyes {
          from { transform: translateY(112.5px); }
          to { transform: translateY(15px); }
        }

        @keyframes pupil {
          0%, 37.5%, 40%, 45%, 87.5%, 100% { stroke-dashoffset: 0; transform: translate(0, 0); }
          12.5%, 25%, 62.5%, 75% { transform: translate(-35px, 0); }
          42.5% { stroke-dashoffset: 35; transform: translate(0, 17.5px); }
        }

        @keyframes mouth-left {
          from, 50% { stroke-dashoffset: -102; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes mouth-right {
          from, 50% { stroke-dashoffset: 102; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes nose {
          from { transform: translate(0, 0); }
          to { transform: translate(0, 22.5px); }
        }
      `}</style>

      <div className="my-custom-face-container">
        <svg className="face" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
          <g className="face__eyes">
            <path d="M60 80 Q60 60 60 80" className="face__pupil" strokeDasharray="35" strokeLinecap="round" />
            <path d="M140 80 Q140 60 140 80" className="face__pupil" strokeDasharray="35" strokeLinecap="round" />
            <path d="M40 60 Q60 45 80 60" className="face__eye-lid" />
            <path d="M120 60 Q140 45 160 60" className="face__eye-lid" />
          </g>

          <path d="M100 95 L90 120 L100 120" className="face__nose" />
          
          <path d="M100 150 Q75 160 50 140" className="face__mouth-left" strokeDasharray="102" />
          <path d="M100 150 Q125 160 150 140" className="face__mouth-right" strokeDasharray="102" />
        </svg>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="text-center z-10 relative"
      >
        <div className="mb-4">
          <SectionLabel text="Error 404" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">
          Looks like you're lost.
        </h1>
        
        <p className="text-sm md:text-base text-gray-400 max-w-md mx-auto mb-10 leading-relaxed">
          The page you are looking for doesn't exist, has been moved, or is currently under construction.
        </p>
        
        <Link href="/" className="btn-primary inline-flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(100,255,218,0.2)]">
          Return Home
        </Link>
      </motion.div>
    </div>
  );
}
