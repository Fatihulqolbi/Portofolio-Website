import React, { useState } from "react";

interface WritingDropdownProps {
  selected: string;
  onSelect: (category: string) => void;
}

const categories = ["Essay", "Karya Tulis Ilmiah", "Lainnya"];

export const WritingDropdown: React.FC<WritingDropdownProps> = ({ selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block mt-4 mb-8">
      <style>{`
        /* --- STAR BUTTON --- */
        .star-btn {
          position: relative;
          padding: 12px 35px;
          background: var(--color-accent);
          font-size: 15px;
          font-weight: 700;
          color: #0a0c14;
          border: 2px solid var(--color-accent);
          border-radius: 8px;
          box-shadow: 0 0 0 rgba(100, 255, 218, 0.5);
          transition: all 0.3s ease-in-out;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 1px;
          min-width: 240px;
          z-index: 10;
        }

        .star-btn svg {
          position: absolute;
          z-index: -5;
          transition: all 1s cubic-bezier(0.05, 0.83, 0.43, 0.96);
          fill: var(--color-accent);
          filter: drop-shadow(0 0 0 rgba(100,255,218,0));
        }

        .star-1 { top: 20%; left: 20%; width: 25px; height: auto; }
        .star-2 { top: 45%; left: 45%; width: 15px; height: auto; transition-timing-function: cubic-bezier(0, 0.4, 0, 1.01); }
        .star-3 { top: 40%; left: 40%; width: 5px; height: auto; transition-timing-function: cubic-bezier(0, 0.4, 0, 1.01); }
        .star-4 { top: 20%; left: 40%; width: 8px; height: auto; transition-timing-function: cubic-bezier(0, 0.4, 0, 1.01); transition-duration: 0.8s; }
        .star-5 { top: 25%; left: 45%; width: 15px; height: auto; transition-timing-function: cubic-bezier(0, 0.4, 0, 1.01); transition-duration: 0.6s; }
        .star-6 { top: 5%; left: 50%; width: 5px; height: auto; transition-timing-function: ease; transition-duration: 0.8s; }

        .star-btn:hover {
          background: rgba(10, 12, 20, 0.8);
          color: var(--color-accent);
          box-shadow: 0 0 25px rgba(100, 255, 218, 0.4);
        }

        .star-btn:hover .star-1 { top: -60%; left: -10%; filter: drop-shadow(0 0 10px var(--color-accent)); z-index: 2; }
        .star-btn:hover .star-2 { top: -25%; left: 10%; filter: drop-shadow(0 0 10px var(--color-accent)); z-index: 2; }
        .star-btn:hover .star-3 { top: 55%; left: 25%; filter: drop-shadow(0 0 10px var(--color-accent)); z-index: 2; }
        .star-btn:hover .star-4 { top: 30%; left: 80%; filter: drop-shadow(0 0 10px var(--color-accent)); z-index: 2; }
        .star-btn:hover .star-5 { top: 25%; left: 105%; filter: drop-shadow(0 0 10px var(--color-accent)); z-index: 2; }
        .star-btn:hover .star-6 { top: 5%; left: 60%; filter: drop-shadow(0 0 10px var(--color-accent)); z-index: 2; }

        /* --- GLITCH RADIO DROPDOWN --- */
        .glitch-radio-wrapper {
          --bg-color: rgba(10, 12, 20, 0.95);
          --primary-color: var(--color-accent);
          --secondary-color: #ff013c;
          --text-color: #8b949e;
          --disabled-color: #555;
          --glitch-anim-duration: 0.4s;

          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background-color: var(--bg-color);
          padding: 2rem;
          border-radius: 1rem;
          border: 1px solid var(--color-border);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(100, 255, 218, 0.1);
          backdrop-filter: blur(10px);
          min-width: 280px;
        }

        .glitch-radio-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          user-select: none;
          position: relative;
        }

        .glitch-radio-container input[type="radio"] {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }

        .radio-circle {
          width: 1.5em;
          height: 1.5em;
          border: 2px solid var(--primary-color);
          border-radius: 50%;
          position: relative;
          transition: all 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
        }

        .radio-dot {
          width: 60%;
          height: 60%;
          background-color: var(--primary-color);
          border-radius: 50%;
          transform: scale(0);
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }

        .radio-label {
          color: var(--text-color);
          font-weight: 600;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          position: relative;
          transition: color 0.3s ease;
        }

        .pulse {
          position: absolute;
          inset: 0;
          border: 2px solid var(--primary-color);
          border-radius: 50%;
          opacity: 0;
        }

        .glitch-radio-container input:checked + .radio-circle .radio-dot {
          transform: scale(1);
          opacity: 1;
        }

        .glitch-radio-container input:checked ~ .radio-label {
          color: var(--primary-color);
          text-shadow: 0 0 8px rgba(100, 255, 218, 0.5);
        }

        .glitch-radio-container input:checked + .radio-circle .pulse {
          animation: pulse-wave 1.2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .glitch-radio-container:hover .radio-circle {
          box-shadow: 0 0 10px var(--primary-color);
        }

        .glitch-radio-container:hover .radio-label::before,
        .glitch-radio-container:hover .radio-label::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: transparent;
        }

        .glitch-radio-container:hover .radio-label::before {
          color: var(--secondary-color);
          animation: glitch-anim-text var(--glitch-anim-duration) cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }

        .glitch-radio-container:hover .radio-label::after {
          color: var(--primary-color);
          animation: glitch-anim-text var(--glitch-anim-duration) cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both;
        }

        @keyframes glitch-anim-text {
          0% { transform: translate(0); clip-path: inset(0 0 0 0); }
          20% { transform: translate(-2px, 1px); clip-path: inset(50% 0 20% 0); }
          40% { transform: translate(2px, -1px); clip-path: inset(20% 0 60% 0); }
          60% { transform: translate(-1px, 1px); clip-path: inset(80% 0 5% 0); }
          80% { transform: translate(1px, -1px); clip-path: inset(30% 0 45% 0); }
          100% { transform: translate(0); clip-path: inset(0 0 0 0); }
        }

        @keyframes pulse-wave {
          from { transform: scale(1); opacity: 0.7; }
          to { transform: scale(2.5); opacity: 0; }
        }
      `}</style>

      <button
        className="star-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
        {/* Render 6 stars */}
        {[1, 2, 3, 4, 5, 6].map(i => (
          <svg key={i} className={`star-${i}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0 L14.59 9.41 L24 12 L14.59 14.59 L12 24 L9.41 14.59 L0 12 L9.41 9.41 Z" />
          </svg>
        ))}
      </button>

      {isOpen && (
        <div className="mt-4 z-10 animate-in fade-in slide-in-from-top-4 duration-300 relative">
          <div className="glitch-radio-wrapper">
            {categories.map((cat) => (
              <label key={cat} className="glitch-radio-container">
                <input
                  type="radio"
                  name="writing-category"
                  checked={selected === cat}
                  onChange={() => {
                    onSelect(cat);
                    setIsOpen(false);
                  }}
                />
                <div className="radio-circle">
                  <div className="radio-dot"></div>
                  <div className="pulse"></div>
                </div>
                <span className="radio-label" data-text={cat}>{cat}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
