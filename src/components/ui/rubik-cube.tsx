import React from "react";

export const RubiksCube = () => {
  return (
    <div className="relative" style={{ width: "100px", height: "100px", perspective: "1000px" }}>
      <style>{`
        .cube {
          width: 100px;
          height: 100px;
          transform-style: preserve-3d;
          animation: rubik-animate 8s linear infinite;
          cursor: pointer;
          transition: 0.5s;
        }

        .cube:hover {
          scale: 1.2;
          animation: rubik-animate 4s linear infinite;
        }

        .cube__face {
          position: absolute;
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          flex-direction: row;
          flex-wrap: wrap;
        }

        .faceBox {
          border: 1px solid rgba(0, 0, 0, 0.8);
          width: calc(100px / 3);
          height: calc(100px / 3);
          opacity: 1;
        }

        #cube__face--front span { background-color: #FF4949; }
        #cube__face--right span { background-color: #13CE66; }
        #cube__face--left span { background-color: #2D8EFF; }
        #cube__face--top span { background-color: #FFCC3D; }
        #cube__face--bottom span { background-color: #fefefe; }
        #cube__face--back span { background-color: #f1f03e; }

        #cube__face--front { transform: rotateY(0deg) translateZ(50px); }
        #cube__face--right { transform: rotateY(90deg) translateZ(50px); }
        #cube__face--back { transform: rotateY(180deg) translateZ(50px); }
        #cube__face--left { transform: rotateY(-90deg) translateZ(50px); }
        #cube__face--top { transform: rotateX(90deg) translateZ(50px); }
        #cube__face--bottom { transform: rotateX(-90deg) translateZ(50px); }

        @keyframes rubik-animate {
          0% {
            transform: rotateX(-30deg) rotateY(0deg) rotateZ(0deg);
          }
          100% {
            transform: rotateX(-30deg) rotateY(360deg) rotateZ(360deg);
          }
        }
      `}</style>

      <div className="cube">
        <div className="cube__face" id="cube__face--front">
          {[...Array(9)].map((_, i) => <span key={i} className="faceBox" />)}
        </div>
        <div className="cube__face" id="cube__face--right">
          {[...Array(9)].map((_, i) => <span key={i} className="faceBox" />)}
        </div>
        <div className="cube__face" id="cube__face--left">
          {[...Array(9)].map((_, i) => <span key={i} className="faceBox" />)}
        </div>
        <div className="cube__face" id="cube__face--top">
          {[...Array(9)].map((_, i) => <span key={i} className="faceBox" />)}
        </div>
        <div className="cube__face" id="cube__face--bottom">
          {[...Array(9)].map((_, i) => <span key={i} className="faceBox" />)}
        </div>
        <div className="cube__face" id="cube__face--back">
          {[...Array(9)].map((_, i) => <span key={i} className="faceBox" />)}
        </div>
      </div>
    </div>
  );
};
