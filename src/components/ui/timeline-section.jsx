import * as React from "react";
import { Calendar, Stethoscope, ClipboardList, Cpu, HeartPulse } from "lucide-react";

const STEPS = [
  {
    label: "Book an Appointment",
    message: "Choose your preferred branch, specialty, and consultant. Book online or call our 24/7 helpline in minutes.",
    Icon: Calendar,
    color: "#8B1A4A",
  },
  {
    label: "Consultation & Diagnosis",
    message: "Meet your specialist for a thorough evaluation. Advanced diagnostics — MRI, CT, lab — available same day.",
    Icon: Stethoscope,
    color: "#1a56db",
  },
  {
    label: "Personalised Treatment Plan",
    message: "Your multidisciplinary team designs a precise, evidence-based care plan tailored to your condition.",
    Icon: ClipboardList,
    color: "#7c3aed",
  },
  {
    label: "World-Class Procedure",
    message: "Undergo surgery or treatment in our NABH-accredited theatres with robotic precision and zero-error protocols.",
    Icon: Cpu,
    color: "#0891b2",
  },
  {
    label: "Recovery & Rehabilitation",
    message: "Dedicated post-op care, physiotherapy, and follow-up support until you return to full health.",
    Icon: HeartPulse,
    color: "#16a34a",
  },
];

export function Timeline() {
  return (
    <div className="flex flex-col gap-0">
      {STEPS.map((step, i) => (
        <div key={step.label} className="flex gap-5 group">
          {/* Icon + line */}
          <div className="flex flex-col items-center">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-transform duration-300 group-hover:scale-110"
              style={{ borderColor: step.color + "50", background: step.color + "15" }}
            >
              <step.Icon size={16} style={{ color: step.color }} />
            </div>
            {i < STEPS.length - 1 && (
              <div className="w-[2px] flex-1 my-1" style={{ background: step.color + "20" }} />
            )}
          </div>

          {/* Content */}
          <div className="pb-7 pt-1.5 flex-1">
            <p className="text-[#1A202C] font-bold text-[15px] leading-tight mb-1">{step.label}</p>
            <p className="text-[#64748B] text-[13px] leading-relaxed">{step.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
