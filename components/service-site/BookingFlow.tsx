"use client";

import { useReducer } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, Globe, Smartphone, Bot, Phone, Zap, ArrowLeft, Check } from "lucide-react";
import CalendarPicker from "./CalendarPicker";
import TimeSlotSelect from "./TimeSlotSelect";

const iconMap: Record<string, React.ElementType> = {
  Cloud,
  Globe,
  Smartphone,
  Bot,
  Phone,
  Zap,
};

const allOptions = [
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    description: "Kubernetes, AWS, Terraform, CI/CD pipelines — production infrastructure that scales.",
    icon: "Cloud",
    pricing: "From $150/hr",
  },
  {
    id: "web-dev",
    title: "Web Development",
    description: "Fast, modern websites and web apps built with React, Next.js, and Node.js.",
    icon: "Globe",
    pricing: "From $120/hr",
  },
  {
    id: "ios-dev",
    title: "iOS Development",
    description: "Native iOS apps with SwiftUI — from design to App Store deployment.",
    icon: "Smartphone",
    pricing: "From $140/hr",
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    description: "Integrate AI into your workflows — chatbots, data pipelines, smart automation.",
    icon: "Bot",
    pricing: "From $160/hr",
  },
  {
    id: "discovery",
    title: "Discovery Call",
    description: "Free 30-minute intro call to discuss your project.",
    icon: "Phone",
    pricing: "Free",
    duration: "30 min",
  },
  {
    id: "sprint",
    title: "Sprint Session",
    description: "Focused 2-hour working session on your specific challenge.",
    icon: "Zap",
    pricing: "$200",
    duration: "2 hours",
  },
];

type Step = "select" | "date" | "time" | "confirm" | "done";

interface BookingState {
  step: Step;
  selectedService: string | null;
  selectedDate: Date | null;
  selectedTime: string | null;
}

type BookingAction =
  | { type: "SELECT_SERVICE"; payload: string }
  | { type: "SELECT_DATE"; payload: Date }
  | { type: "SELECT_TIME"; payload: string }
  | { type: "CONFIRM" }
  | { type: "BACK" }
  | { type: "RESET" };

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "SELECT_SERVICE":
      return { ...state, selectedService: action.payload, step: "date" };
    case "SELECT_DATE":
      return { ...state, selectedDate: action.payload, step: "time" };
    case "SELECT_TIME":
      return { ...state, selectedTime: action.payload, step: "confirm" };
    case "CONFIRM":
      return { ...state, step: "done" };
    case "BACK": {
      const steps: Step[] = ["select", "date", "time", "confirm"];
      const currentIndex = steps.indexOf(state.step);
      if (currentIndex <= 0) return state;
      return { ...state, step: steps[currentIndex - 1] };
    }
    case "RESET":
      return { step: "select", selectedService: null, selectedDate: null, selectedTime: null };
    default:
      return state;
  }
}

const stepVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export default function BookingFlow() {
  const [state, dispatch] = useReducer(bookingReducer, {
    step: "select",
    selectedService: null,
    selectedDate: null,
    selectedTime: null,
  });

  const selectedOption = allOptions.find((o) => o.id === state.selectedService);

  const stepTitles: Record<Step, string> = {
    select: "Choose a Service",
    date: "Pick a Date",
    time: "Pick a Time",
    confirm: "Confirm Booking",
    done: "Booking Confirmed",
  };

  return (
    <section id="booking" className="py-24 px-4 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Book a Session
        </h2>
        <p className="text-white/40 leading-relaxed max-w-2xl">
          Schedule time with me in three simple steps.
        </p>
      </motion.div>

      <div className="rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-6 sm:p-8">
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            {state.step !== "select" && state.step !== "done" && (
              <button
                onClick={() => dispatch({ type: "BACK" })}
                className="p-1.5 text-white/50 hover:text-white transition-colors rounded-md hover:bg-white/5"
                aria-label="Go back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h3 className="text-lg font-semibold text-white">
              {stepTitles[state.step]}
            </h3>
          </div>
          {state.step !== "done" && state.step !== "select" && (
            <span className="text-xs text-white/30">
              Step{" "}
              {state.step === "date" ? "2" : state.step === "time" ? "3" : "4"}{" "}
              of 4
            </span>
          )}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          {state.step === "select" && (
            <motion.div
              key="select"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              {allOptions.map((option) => {
                const Icon = iconMap[option.icon];
                return (
                  <button
                    key={option.id}
                    onClick={() =>
                      dispatch({ type: "SELECT_SERVICE", payload: option.id })
                    }
                    className="text-left p-4 rounded-lg border border-white/[0.08] hover:border-white/20 transition-colors group"
                  >
                    <Icon className="w-4 h-4 text-white/50 group-hover:text-white/80 mb-2 transition-colors" />
                    <h4 className="text-sm font-medium text-white mb-1">
                      {option.title}
                    </h4>
                    <p className="text-xs text-white/40">{option.pricing}</p>
                  </button>
                );
              })}
            </motion.div>
          )}

          {state.step === "date" && (
            <motion.div
              key="date"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center">
                {selectedOption && (
                  <p className="text-sm text-white/50 mb-6">
                    Scheduling: <span className="text-white/80">{selectedOption.title}</span>
                  </p>
                )}
                <CalendarPicker
                  selectedDate={state.selectedDate}
                  onSelectDate={(date) =>
                    dispatch({ type: "SELECT_DATE", payload: date })
                  }
                />
              </div>
            </motion.div>
          )}

          {state.step === "time" && (
            <motion.div
              key="time"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center">
                {state.selectedDate && (
                  <p className="text-sm text-white/50 mb-6">
                    Date:{" "}
                    <span className="text-white/80">
                      {state.selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                )}
                <TimeSlotSelect
                  selectedTime={state.selectedTime}
                  onSelectTime={(time) =>
                    dispatch({ type: "SELECT_TIME", payload: time })
                  }
                />
              </div>
            </motion.div>
          )}

          {state.step === "confirm" && (
            <motion.div
              key="confirm"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="max-w-sm mx-auto text-center"
            >
              <div className="space-y-4 mb-8">
                <div className="rounded-lg border border-white/[0.08] p-4 text-left space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-white/40">Service</span>
                    <span className="text-sm text-white">
                      {selectedOption?.title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-white/40">Date</span>
                    <span className="text-sm text-white">
                      {state.selectedDate?.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-white/40">Time</span>
                    <span className="text-sm text-white">
                      {state.selectedTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-white/40">Price</span>
                    <span className="text-sm text-white">
                      {selectedOption?.pricing}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => dispatch({ type: "CONFIRM" })}
                className="bg-white text-black hover:bg-white/90 rounded-md px-8 py-2.5 font-medium transition-colors w-full"
              >
                Confirm Booking
              </button>
            </motion.div>
          )}

          {state.step === "done" && (
            <motion.div
              key="done"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="text-center py-8"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                You&apos;re all set!
              </h4>
              <p className="text-sm text-white/40 mb-6">
                A confirmation email will be sent to you shortly.
              </p>
              <button
                onClick={() => dispatch({ type: "RESET" })}
                className="border border-white/[0.15] text-white/60 hover:border-white/30 hover:text-white rounded-md px-5 py-2.5 text-sm transition-colors"
              >
                Book Another Session
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
