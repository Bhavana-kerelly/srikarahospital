import React from 'react';
import { Check } from 'lucide-react';

export interface BookingStep {
  number: number;
  label: string;
}

const BOOKING_STEPS: BookingStep[] = [
  { number: 1, label: 'Search' },
  { number: 2, label: 'Choose Slot' },
  { number: 3, label: 'Verify' },
  { number: 4, label: 'Details' },
  { number: 5, label: 'Review' },
];

export interface BookingProgressProps {
  currentStep: number;
  hasHold?: boolean;
}

export const BookingProgress: React.FC<BookingProgressProps> = ({
  currentStep,
  hasHold = false,
}) => {
  return (
    <nav aria-label="Booking progress" className="w-full">
      <ol className="flex items-center justify-between w-full">
        {BOOKING_STEPS.map((step, index) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          const isUpcoming = step.number > currentStep;
          const isLast = index === BOOKING_STEPS.length - 1;

          return (
            <li key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5">
                {/* Step circle */}
                <div
                  className={`
                    flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold border-2 transition-all duration-300 relative
                    ${isCompleted
                      ? 'bg-[#0D9488] border-[#0D9488] text-white'
                      : isCurrent
                      ? 'bg-[#0F2444] border-[#0F2444] text-white shadow-md'
                      : 'bg-white border-[#CBD5E1] text-[#94A3B8]'
                    }
                  `}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <span>{step.number}</span>
                  )}

                  {/* Hold indicator dot on step 2 */}
                  {isCurrent && hasHold && (
                    <span
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#0D9488] border-2 border-white animate-pulse"
                      aria-label="Slot currently held"
                    />
                  )}
                </div>

                {/* Step label — only show on sm+ */}
                <span
                  className={`hidden sm:block text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap ${
                    isCurrent
                      ? 'text-[#0F2444]'
                      : isCompleted
                      ? 'text-[#0D9488]'
                      : 'text-[#94A3B8]'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line between steps */}
              {!isLast && (
                <div
                  className={`flex-1 h-0.5 mx-2 rounded transition-all duration-300 ${
                    step.number < currentStep ? 'bg-[#0D9488]' : 'bg-[#E2E8F0]'
                  }`}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
