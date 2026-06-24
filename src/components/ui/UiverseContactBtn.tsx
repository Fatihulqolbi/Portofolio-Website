"use client";

import React, { useState } from "react";

export function UiverseContactBtn() {
  const [sent, setSent] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      window.open("https://wa.me/6287759765892", "_blank");
      setTimeout(() => setSent(false), 2000);
    }, 1000); // delay to show animation before opening WA
  };

  return (
    <>
      <style>{`
        .uiverse-button {
          --primary: var(--color-accent, #64ffda);
          --neutral-1: rgba(255, 255, 255, 0.05); /* Dark background */
          --neutral-2: rgba(0, 0, 0, 0.8);
          --radius: 14px;

          cursor: pointer;
          border-radius: var(--radius);
          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
          border: none;
          box-shadow: 0 0.5px 0.5px 1px rgba(255, 255, 255, 0.2),
            0 10px 20px rgba(0, 0, 0, 0.2), 0 4px 5px 0px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.3s ease;
          min-width: 180px;
          padding: 10px 15px;
          height: 48px;
          font-family: inherit;
          font-size: 16px;
          font-weight: 600;
          color: white;
          background: transparent;
          outline: none;
          transform: scale(0.9); /* scale down slightly for navbar */
        }
        @media (max-width: 768px) {
           .uiverse-button { display: none; }
        }
        .uiverse-button:hover {
          transform: scale(0.95);
          box-shadow: 0 0 1px 2px rgba(100, 255, 218, 0.3),
            0 15px 30px rgba(0, 0, 0, 0.3), 0 10px 3px -3px rgba(0, 0, 0, 0.04);
        }
        .uiverse-button:active {
          transform: scale(0.9);
          box-shadow: 0 0 1px 2px rgba(100, 255, 218, 0.3),
            0 10px 3px -3px rgba(0, 0, 0, 0.2);
        }
        .uiverse-button:after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: var(--radius);
          border: 2.5px solid transparent;
          background: linear-gradient(var(--neutral-1), var(--neutral-2)) padding-box,
            linear-gradient(to bottom, rgba(100,255,218, 0.1), rgba(100,255,218, 0.45))
              border-box;
          z-index: 0;
          transition: all 0.4s ease;
        }
        .uiverse-button:hover::after {
          transform: scale(1.05, 1.1);
          box-shadow: inset 0 -1px 3px 0 rgba(100, 255, 218, 1);
        }
        .uiverse-button::before {
          content: "";
          inset: 7px 6px 6px 6px;
          position: absolute;
          background: linear-gradient(to top, var(--neutral-1), var(--neutral-2));
          border-radius: 30px;
          filter: blur(0.5px);
          z-index: 2;
        }
        .uiverse-state p {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
        }
        .uiverse-state .icon {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          transform: scale(1.25);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .uiverse-state .icon svg {
          overflow: visible;
        }

        /* Outline */
        .uiverse-outline {
          position: absolute;
          border-radius: inherit;
          overflow: hidden;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.4s ease;
          inset: -2px -3.5px;
        }
        .uiverse-outline::before {
          content: "";
          position: absolute;
          inset: -100%;
          background: conic-gradient(
            from 180deg,
            transparent 60%,
            var(--primary) 80%,
            transparent 100%
          );
          animation: uiverse-spin 2s linear infinite;
          animation-play-state: paused;
        }
        @keyframes uiverse-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .uiverse-button:hover .uiverse-outline {
          opacity: 1;
        }
        .uiverse-button:hover .uiverse-outline::before {
          animation-play-state: running;
        }

        /* Letters */
        .uiverse-state p span {
          display: block;
          opacity: 0;
          animation: uiverse-slideDown 0.8s ease forwards calc(var(--i) * 0.03s);
        }
        .uiverse-button:hover p span {
          opacity: 1;
          animation: uiverse-wave 0.5s ease forwards calc(var(--i) * 0.02s);
        }
        .uiverse-button:focus p span, .uiverse-button.is-sent p span {
          opacity: 1;
          animation: uiverse-disapear 0.6s ease forwards calc(var(--i) * 0.03s);
        }
        @keyframes uiverse-wave {
          30% { opacity: 1; transform: translateY(4px) translateX(0) rotate(0); }
          50% { opacity: 1; transform: translateY(-3px) translateX(0) rotate(0); color: var(--primary); }
          100% { opacity: 1; transform: translateY(0) translateX(0) rotate(0); }
        }
        @keyframes uiverse-slideDown {
          0% { opacity: 0; transform: translateY(-20px) translateX(5px) rotate(-90deg); color: var(--primary); filter: blur(5px); }
          30% { opacity: 1; transform: translateY(4px) translateX(0) rotate(0); filter: blur(0); }
          50% { opacity: 1; transform: translateY(-3px) translateX(0) rotate(0); }
          100% { opacity: 1; transform: translateY(0) translateX(0) rotate(0); }
        }
        @keyframes uiverse-disapear {
          from { opacity: 1; }
          to { opacity: 0; transform: translateX(5px) translateY(20px); color: var(--primary); filter: blur(5px); }
        }

        /* Plane / WhatsApp */
        .state--default .icon svg {
          animation: uiverse-land 0.6s ease forwards;
        }
        .uiverse-button:hover .state--default .icon {
          transform: rotate(15deg) scale(1.25);
        }
        .uiverse-button:focus .state--default svg, .uiverse-button.is-sent .state--default svg {
          animation: uiverse-takeOff 0.8s linear forwards;
        }
        .uiverse-button:focus .state--default .icon, .uiverse-button.is-sent .state--default .icon {
          transform: rotate(0) scale(1.25);
        }
        @keyframes uiverse-takeOff {
          0% { opacity: 1; }
          60% { opacity: 1; transform: translateX(70px) rotate(45deg) scale(2); }
          100% { opacity: 0; transform: translateX(160px) rotate(45deg) scale(0); }
        }
        @keyframes uiverse-land {
          0% { transform: translateX(-60px) translateY(30px) rotate(-50deg) scale(2); opacity: 0; filter: blur(3px); }
          100% { transform: translateX(0) translateY(0) rotate(0); opacity: 1; filter: blur(0); }
        }

        /* Contrail */
        .state--default .icon:before {
          content: "";
          position: absolute;
          top: 50%;
          height: 2px;
          width: 0;
          left: -5px;
          background: linear-gradient(to right, transparent, rgba(100, 255, 218, 0.5));
        }
        .uiverse-button:focus .state--default .icon:before, .uiverse-button.is-sent .state--default .icon:before {
          animation: uiverse-contrail 0.8s linear forwards;
        }
        @keyframes uiverse-contrail {
          0% { width: 0; opacity: 1; }
          8% { width: 15px; }
          60% { opacity: 0.7; width: 80px; }
          100% { opacity: 0; width: 160px; }
        }

        /* States */
        .uiverse-state {
          padding-left: 29px;
          z-index: 2;
          display: flex;
          position: relative;
        }
        .state--default span:nth-child(7) {
          margin-right: 5px;
        }
        .state--sent {
          display: none;
        }
        .state--sent svg {
          transform: scale(1.25);
          margin-right: 8px;
        }
        .uiverse-button:focus .state--default, .uiverse-button.is-sent .state--default {
          position: absolute;
        }
        .uiverse-button:focus .state--sent, .uiverse-button.is-sent .state--sent {
          display: flex;
        }
        .uiverse-button:focus .state--sent span, .uiverse-button.is-sent .state--sent span {
          opacity: 0;
          animation: uiverse-slideDown 0.8s ease forwards calc(var(--i) * 0.2s);
        }
        .uiverse-button:focus .state--sent .icon svg, .uiverse-button.is-sent .state--sent .icon svg {
          opacity: 0;
          animation: uiverse-appear 1.2s ease forwards 0.8s;
        }
        @keyframes uiverse-appear {
          0% { opacity: 0; transform: scale(4) rotate(-40deg); color: var(--primary); filter: blur(4px); }
          30% { opacity: 1; transform: scale(0.6); filter: blur(1px); }
          50% { opacity: 1; transform: scale(1.2); filter: blur(0); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <button 
        className={`uiverse-button ${sent ? 'is-sent' : ''}`}
        onClick={handleClick}
      >
        <div className="uiverse-outline"></div>
        <div className="uiverse-state state--default">
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-[var(--color-accent)]"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <p>
            <span style={{ "--i": 0 } as any}>C</span>
            <span style={{ "--i": 1 } as any}>o</span>
            <span style={{ "--i": 2 } as any}>n</span>
            <span style={{ "--i": 3 } as any}>t</span>
            <span style={{ "--i": 4 } as any}>a</span>
            <span style={{ "--i": 5 } as any}>c</span>
            <span style={{ "--i": 6 } as any}>t</span>
            <span style={{ "--i": 7 } as any}>&nbsp;</span>
            <span style={{ "--i": 8 } as any}>M</span>
            <span style={{ "--i": 9 } as any}>e</span>
          </p>
        </div>
        <div className="uiverse-state state--sent">
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-accent)]">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <p>
            <span style={{ "--i": 10 } as any}>O</span>
            <span style={{ "--i": 11 } as any}>p</span>
            <span style={{ "--i": 12 } as any}>e</span>
            <span style={{ "--i": 13 } as any}>n</span>
            <span style={{ "--i": 14 } as any}>e</span>
            <span style={{ "--i": 15 } as any}>d</span>
          </p>
        </div>
      </button>
    </>
  );
}
