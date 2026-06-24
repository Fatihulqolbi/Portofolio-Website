import React from "react";
import Image from "next/image";

interface AchievementCardProps {
  title: string;
  organizer: string;
  description: string;
  imageSrc: string;
  link: string;
  imageClassName?: string;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  title,
  organizer,
  description,
  imageSrc,
  link,
  imageClassName = "object-center",
}) => {
  return (
    <div className="card-achieve group">
      <style>{`
        .card-achieve {
          position: relative;
          width: 100%;
          height: 320px;
          background-color: var(--color-surface);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          perspective: 1200px;
          box-shadow: 0 0 0 1px var(--color-border);
          transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
        }

        .card-achieve:hover {
          transform: scale(1.02);
          box-shadow: 0 12px 30px rgba(100, 255, 218, 0.15), 0 0 0 1px var(--color-accent);
          z-index: 10;
        }

        .card-achieve__content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 24px;
          box-sizing: border-box;
          background-color: rgba(10, 12, 20, 0.95);
          backdrop-filter: blur(8px);
          transform: rotateX(-90deg);
          transform-origin: bottom;
          transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          flex-direction: column;
          z-index: 20;
        }

        .card-achieve:hover .card-achieve__content {
          transform: rotateX(0deg);
        }

        .btn-cert {
          position: relative;
          padding: 10px 20px;
          border-radius: 7px;
          border: 1px solid var(--color-accent);
          font-size: 13px;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 1px;
          background: transparent;
          color: var(--color-accent);
          overflow: hidden;
          box-shadow: 0 0 0 0 transparent;
          transition: all 0.2s ease-in;
          margin-top: auto;
          text-align: center;
          display: inline-block;
          text-decoration: none;
          width: fit-content;
          align-self: flex-start;
        }

        .btn-cert:hover {
          background: var(--color-accent);
          color: #0a0c14;
          box-shadow: 0 0 20px 2px rgba(100, 255, 218, 0.4);
          transition: all 0.2s ease-out;
        }

        .btn-cert:hover::before {
          animation: sh02 0.5s 0s linear;
        }

        .btn-cert::before {
          content: '';
          display: block;
          width: 0px;
          height: 86%;
          position: absolute;
          top: 7%;
          left: 0%;
          opacity: 0;
          background: #fff;
          box-shadow: 0 0 40px 20px #fff;
          transform: skewX(-20deg);
        }

        @keyframes sh02 {
          from { opacity: 0; left: 0%; }
          50% { opacity: 1; }
          to { opacity: 0; left: 100%; }
        }
      `}</style>
      
      {/* Thumbnail */}
      <div className="absolute inset-0 w-full h-full z-10 transition-transform duration-700 group-hover:scale-110">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className={`object-cover opacity-90 ${imageClassName}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c14] to-transparent opacity-60" />
      </div>

      {/* Default overlay text when not hovered (optional, can just show image) */}
      <div className="absolute bottom-4 left-4 right-4 z-10 transition-opacity duration-500 group-hover:opacity-0">
         <h3 className="text-lg font-bold text-white drop-shadow-lg line-clamp-2">{title}</h3>
      </div>

      {/* Content that flips up */}
      <div className="card-achieve__content">
        <h3 className="text-xl font-bold mb-2 text-white leading-tight">{title}</h3>
        <p className="text-xs font-semibold tracking-wider text-[var(--color-accent)] mb-4 uppercase">
          {organizer}
        </p>
        <p className="text-sm text-gray-300 leading-relaxed mb-6 flex-grow overflow-y-auto hide-scrollbar">
          {description}
        </p>
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-cert"
        >
          View Certificate
        </a>
      </div>
    </div>
  );
};
