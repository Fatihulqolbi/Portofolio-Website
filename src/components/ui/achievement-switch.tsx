import React from "react";

interface AchievementSwitchProps {
  isHighSchool: boolean;
  onChange: (val: boolean) => void;
}

export const AchievementSwitch: React.FC<AchievementSwitchProps> = ({ isHighSchool, onChange }) => {
  return (
    <div>
      <style>{`
        .switch-3d-cyan {
          --w: 160px;
          --h: 40px;
          --knob-size: 20px;
          --offset: 10px;
          --cyan: var(--color-accent); /* GSM Hacker Green */
          --white-glow: #ffffff;
          --bg-off: #11141c;
          --bg-on: #11141c;
          --half-size: calc(var(--knob-size) / 2);

          position: relative;
          display: inline-block;
          width: var(--w);
          height: var(--h);
          cursor: pointer;
        }

        .switch-input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .switch-track {
          position: absolute;
          inset: 0;
          background-color: var(--bg-off);
          border-radius: var(--h);
          border: 1px solid var(--color-border);
          transition: all 0.5s ease;
          overflow: hidden;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
        }

        .track-text {
          position: absolute;
          font-family: inherit;
          font-size: 13px;
          font-weight: 800;
          color: var(--white-glow);
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
          transition: opacity 0.4s ease, transform 0.4s ease;
          pointer-events: none;
          white-space: nowrap;
          letter-spacing: 0.5px;
        }

        .text-uni {
          left: 55px;
          opacity: 1;
        }

        .text-hs {
          left: 15px;
          opacity: 0;
          transform: translateX(-10px);
        }

        .switch-knob {
          position: absolute;
          top: var(--offset);
          left: var(--offset);
          width: var(--knob-size);
          height: var(--knob-size);
          perspective: 1200px;
          pointer-events: none;
          transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 2;
        }

        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: spin-cube 3s infinite linear;
        }

        .cube-face {
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(100, 255, 218, 0.1);
          border: 1px solid var(--cyan);
          box-shadow: 0 0 4px var(--cyan), inset 0 0 4px var(--cyan);
          opacity: 0.8;
          backface-visibility: visible;
          transition: all 0.5s ease;
        }

        .face-front { transform: translateZ(var(--half-size)); }
        .face-back { transform: rotateY(180deg) translateZ(var(--half-size)); }
        .face-right { transform: rotateY(90deg) translateZ(var(--half-size)); }
        .face-left { transform: rotateY(-90deg) translateZ(var(--half-size)); }
        .face-top { transform: rotateX(90deg) translateZ(var(--half-size)); }
        .face-bottom { transform: rotateX(-90deg) translateZ(var(--half-size)); }

        .switch-input:checked ~ .switch-track .switch-knob {
          transform: translateX(calc(var(--w) - var(--knob-size) - (var(--offset) * 2)));
        }

        .switch-input:checked ~ .switch-track .text-uni {
          opacity: 0;
          transform: translateX(10px);
        }
        .switch-input:checked ~ .switch-track .text-hs {
          opacity: 1;
          transform: translateX(0);
        }

        .switch-input:checked ~ .switch-track {
          background-color: var(--bg-on);
          border-color: var(--cyan);
          box-shadow: 0 0 10px rgba(100, 255, 218, 0.2);
        }

        .switch-input:checked ~ .switch-track .cube-face {
          background: rgba(100, 255, 218, 0.15);
          box-shadow: 0 0 8px var(--cyan), inset 0 0 8px var(--cyan);
        }

        @keyframes spin-cube {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
      `}</style>
      <label className="switch-3d-cyan">
        <input 
          type="checkbox" 
          className="switch-input" 
          checked={isHighSchool}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="switch-track">
          <span className="track-text text-uni">University</span>
          <span className="track-text text-hs">High School</span>
          <div className="switch-knob">
            <div className="cube">
              <div className="cube-face face-front"></div>
              <div className="cube-face face-back"></div>
              <div className="cube-face face-right"></div>
              <div className="cube-face face-left"></div>
              <div className="cube-face face-top"></div>
              <div className="cube-face face-bottom"></div>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
};
