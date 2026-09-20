import * as React from "react";
import { cva } from "class-variance-authority";

function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

const glassButtonVariants = cva(
  "relative isolate all-unset cursor-pointer rounded-full transition-all",
  {
    variants: {
      size: {
        default: "text-base font-semibold",
        sm: "text-sm font-semibold",
        lg: "text-lg font-bold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const glassButtonTextVariants = cva(
  "glass-button-text relative block select-none tracking-normal uppercase",
  {
    variants: {
      size: {
        default: "px-7 py-3.5",
        sm: "px-5 py-2.5",
        lg: "px-9 py-4.5",
        icon: "flex h-10 w-10 items-center justify-center",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const GlassButton = React.forwardRef(
  ({ className, children, size, contentClassName, onClick, ...props }, ref) => {
    return (
      <>
        <style>{`
          .glass-button-wrap {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            isolation: isolate;
            border-radius: 9999px;
            transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
          }
          .glass-button-wrap:hover {
            transform: translateY(-2px);
          }
          .glass-button-wrap:active {
            transform: translateY(1px) scale(0.98);
          }
          .glass-button {
            position: relative;
            cursor: pointer;
            outline: none;
            border-radius: 9999px;
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(16px) saturate(180%);
            -webkit-backdrop-filter: blur(16px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.85);
            border-top-color: rgba(255, 255, 255, 1);
            border-bottom-color: rgba(139, 26, 74, 0.2);
            box-shadow:
              inset 0 1px 1px 0 rgba(255, 255, 255, 0.9),
              inset 0 -1px 3px 0 rgba(139, 26, 74, 0.12),
              0 8px 24px -4px rgba(139, 26, 74, 0.15),
              0 2px 6px -1px rgba(0, 0, 0, 0.05);
            color: #1A1A1A;
            transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          .glass-button-wrap:hover .glass-button {
            background: rgba(255, 255, 255, 0.92);
            border-color: rgba(139, 26, 74, 0.35);
            box-shadow:
              inset 0 1px 2px 0 rgba(255, 255, 255, 1),
              inset 0 -1px 2px 0 rgba(139, 26, 74, 0.2),
              0 12px 30px -4px rgba(139, 26, 74, 0.25),
              0 4px 10px -2px rgba(139, 26, 74, 0.12);
          }
          .glass-button-text {
            position: relative;
            z-index: 1;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-weight: 700;
            letter-spacing: 0.05em;
            color: #1A202C;
            transition: color 0.2s ease;
          }
          .glass-button-wrap:hover .glass-button-text {
            color: #8B1A4A;
          }
          .glass-button-shadow {
            position: absolute;
            inset: -2px;
            border-radius: inherit;
            pointer-events: none;
            z-index: -1;
            opacity: 0.65;
            background: radial-gradient(circle at 50% 100%, rgba(139, 26, 74, 0.22), transparent 70%);
            filter: blur(10px);
            transition: opacity 0.3s ease, filter 0.3s ease;
          }
          .glass-button-wrap:hover .glass-button-shadow {
            opacity: 1;
            filter: blur(14px);
          }
        `}</style>
        <div
          className={cn(
            "glass-button-wrap cursor-pointer rounded-full",
            className
          )}
          onClick={onClick}
        >
          <button
            className={cn("glass-button", glassButtonVariants({ size }))}
            ref={ref}
            {...props}
          >
            <span
              className={cn(
                glassButtonTextVariants({ size }),
                contentClassName
              )}
            >
              {children}
            </span>
          </button>
          <div className="glass-button-shadow rounded-full"></div>
        </div>
      </>
    );
  }
);
GlassButton.displayName = "GlassButton";

export { GlassButton, glassButtonVariants };
