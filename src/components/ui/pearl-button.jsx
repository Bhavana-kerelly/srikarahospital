import React from "react";

export const PearlButton = ({
  label = "Pearl Button",
  size = "default",
  className = "",
  children,
  onClick,
  ...props
}) => {
  return (
    <>
      <style>{`
        .pearl-button {
          --white: #ffe7f3;
          --bg: #8B1A4A;
          --radius: 100px;
          outline: none;
          cursor: pointer;
          border: 0;
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius);
          background-color: var(--bg);
          transition: all 0.25s ease;
          box-shadow:
            inset 0 0.3rem 0.9rem rgba(255, 220, 235, 0.45),
            inset 0 -0.1rem 0.3rem rgba(55, 6, 30, 0.8),
            inset 0 -0.4rem 0.9rem rgba(255, 175, 210, 0.45),
            0 1.5rem 2.5rem rgba(139, 26, 74, 0.3),
            0 0.8rem 1rem -0.5rem rgba(139, 26, 74, 0.6);
        }
        .pearl-button .wrap {
          font-size: 18px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          padding: 22px 42px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border-radius: inherit;
          position: relative;
          overflow: hidden;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pearl-button.pearl-btn-sm .wrap {
          font-size: 15px;
          padding: 16px 30px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .pearl-button.pearl-btn-lg .wrap {
          font-size: 22px;
          padding: 28px 52px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .pearl-button .wrap p span:nth-child(2) {
          display: none;
        }
        .pearl-button:hover .wrap p span:nth-child(1) {
          display: none;
        }
        .pearl-button:hover .wrap p span:nth-child(2) {
          display: inline-block;
        }
        .pearl-button .wrap p {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin: 0;
          transition: all 0.2s ease;
          transform: translateY(2%);
          -webkit-mask-image: linear-gradient(to bottom, white 50%, transparent);
                  mask-image: linear-gradient(to bottom, white 50%, transparent);
        }
        .pearl-button .wrap::before,
        .pearl-button .wrap::after {
          content: "";
          position: absolute;
          transition: all 0.3s ease;
        }
        .pearl-button .wrap::before {
          left: -15%;
          right: -15%;
          bottom: 25%;
          top: -100%;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.18);
        }
        .pearl-button .wrap::after {
          left: 6%;
          right: 6%;
          top: 12%;
          bottom: 40%;
          border-radius: 22px 22px 0 0;
          box-shadow: inset 0 10px 8px -10px rgba(255, 255, 255, 0.9);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(139, 26, 74, 0.2) 50%,
            rgba(0, 0, 0, 0) 100%
          );
        }
        .pearl-button:hover {
          background-color: #9f1d53;
          box-shadow:
            inset 0 0.3rem 0.6rem rgba(255, 255, 255, 0.6),
            inset 0 -0.1rem 0.3rem rgba(55, 6, 30, 0.8),
            inset 0 -0.4rem 0.9rem rgba(255, 190, 225, 0.7),
            0 2rem 3rem rgba(139, 26, 74, 0.45),
            0 1rem 1.2rem -0.4rem rgba(139, 26, 74, 0.75);
        }
        .pearl-button:hover .wrap::before {
          transform: translateY(-5%);
        }
        .pearl-button:hover .wrap::after {
          opacity: 0.6;
          transform: translateY(5%);
        }
        .pearl-button:hover .wrap p {
          transform: translateY(-4%);
        }
        .pearl-button:active {
          transform: translateY(3px);
          box-shadow:
            inset 0 0.3rem 0.5rem rgba(255, 255, 255, 0.7),
            inset 0 -0.1rem 0.3rem rgba(55, 6, 30, 0.9),
            inset 0 -0.4rem 0.9rem rgba(255, 190, 225, 0.5),
            0 1.5rem 2rem rgba(139, 26, 74, 0.3),
            0 0.6rem 0.8rem -0.4rem rgba(139, 26, 74, 0.6);
        }
      `}</style>

      <button
        type="button"
        onClick={onClick}
        className={`pearl-button ${size === "sm" ? "pearl-btn-sm" : size === "lg" ? "pearl-btn-lg" : ""} ${className}`}
        {...props}
      >
        <div className="wrap">
          <p>
            <span>✧</span>
            <span>✦</span>
            {children || label}
          </p>
        </div>
      </button>
    </>
  );
};
