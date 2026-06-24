import React from "react";

interface AchievementMoreBtnProps {
  onClick?: () => void;
  text?: string;
}

export const AchievementMoreBtn: React.FC<AchievementMoreBtnProps> = ({ 
  onClick, 
  text = "More Achievements" 
}) => {
  return (
    <div>
      <style>{`
        .unique-button {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          height: 40px;
          padding: 0 20px;
          font-size: 12px;
          font-weight: 800;
          text-decoration: none;
          color: #0a0c14;
          background-color: var(--color-accent);
          border: none;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: 0.3s all ease-in-out;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .unique-button:hover {
          transition: 0.3s all ease-in-out;
          box-shadow: 0px 5px 15px rgba(100, 255, 218, 0.3);
        }

        .unique-button span {
          display: block;
          transition: all 0.3s ease-in-out;
          z-index: 10;
        }

        .unique-button:active {
          transform: scale(0.95);
        }

        .unique-button::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 0;
          height: 80%;
          border-bottom-left-radius: 60px;
          border-top-right-radius: 60px;
          border-top-left-radius: 20px;
          border-bottom-right-radius: 20px;
          background-color: var(--color-surface);
          transition: all 0.2s ease-in-out;
          z-index: 1;
        }

        .unique-button:hover::before {
          width: 100%;
        }

        .unique-button::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 0;
          border-bottom-left-radius: 20px;
          border-top-right-radius: 20px;
          border-top-left-radius: 60px;
          border-bottom-right-radius: 60px;
          background-color: var(--color-surface);
          transition: all 0.3s ease-in-out;
          z-index: 1;
        }

        .unique-button:hover::after {
          height: 100%;
        }

        /* When hovered, we want the text to be white/accent because background is dark now */
        .unique-button:hover span {
          color: var(--color-accent);
        }
      `}</style>
      <button className="unique-button" onClick={onClick}>
        <span>{text}</span>
      </button>
    </div>
  );
};
