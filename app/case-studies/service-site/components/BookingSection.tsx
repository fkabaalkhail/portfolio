"use client";

import { useReducer } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, Globe, Smartphone, Bot, Phone, Zap, ArrowLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { allBookingServices } from "../lib/services";
import CalendarPicker from "./CalendarPicker";
import TimeSlotPicker from "./TimeSlotPicker";

const iconMap: Record<string, React.ElementType> = {
  Cloud,
  Globe,
  Smartphone,
  Bot,
  Phone,
  Zap,
};

type Step = "select-service" | "select-date" | "select-time" | "confirm" | "success";

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
      return { ...state, selectedService: action.payload, step: "select-date" };
    case "SELECT_DATE":
      return { ...state, selectedDate: action.payload, step: "select-time" };
    case "SELECT_TIME":
      return { ...state, selectedTime: action.payload, step: "confirm" };
    case "CONFIRM":
      return { ...state, step: "success" };
    case "BACK": {
      const steps: Step[] = ["select-service", "select-date", "select-time", "confirm"];
      const currentIndex = steps.indexOf(state.step);
      if (currentIndex <= 0) return state;
      return { ...state, step: steps[currentIndex - 1] };
    }
    case "RESET":
      return { step: "select-service", selectedService: null, selectedDate: null, selectedTime: null };
    default:
      return state;
  }
}

const stepVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export default function BookingSection() {
  const [state, dispatch] = useReducer(bookingReducer, {
    step: "select-service",
    selectedService: null,
    selectedDate: null,
    selectedTime: null,
  });

  const selectedOption = allBookingServices.find((o) => o.id === state.selectedService);

  const stepTitles: Record<Step, string> = {
    "select-service": "Choose a Service",
    "select-date": "Pick a Date",
    "select-time": "Pick a Time",
    confirm: "Confirm Booking",
    success: "Booking Confirmed",
  };

  const stepNumber = () => {
    switch (state.step) {
      case "select-service": return 1;
      case "select-date": return 2;
      case "select-time": return 3;
      case "confirm": return 4;
      default: return 0;
    }
  };

  return (
    <section id="booking" className="py-24 max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4">
          Book a Session
        </h2>
        <p className="text-black/40 dark:text-white/40 leading-relaxed max-w-2xl">
          Schedule time with me in a few simple steps.
        </p>
      </motion.div>

      <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-gray-50 dark:bg-[#0a0a0a] p-6 sm:p-8">
        {/* Step header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            {state.step !== "select-service" && state.step !== "success" && (
              <button
                onClick={() => dispatch({ type: "BACK" })}
                className="p-1.5 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors rounded-md hover:bg-black/5 dark:hover:bg-white/5"
                aria-label="Go back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h3 className="text-lg font-semibold text-black dark:text-white">
              {stepTitles[state.step]}
            </h3>
          </div>
          {state.step !== "success" && state.step !== "select-service" && (
            <span className="text-xs text-black/30 dark:text-white/30">
              Step {stepNumber()} of 4
            </span>
          )}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          {state.step === "select-service" && (
            <motion.div
              key="select-service"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              {allBookingServices.map((option) => {
                const Icon = iconMap[option.icon];
                return (
                  <button
                    key={option.id}
                    onClick={() =>
                      dispatch({ type: "SELECT_SERVICE", payload: option.id })
                    }
                    className="text-left p-4 rounded-lg border border-black/[0.08] dark:border-white/[0.08] hover:border-black/[0.15] dark:hover:border-white/[0.15] transition-colors group"
                  >
                    <Icon className="w-4 h-4 text-black/50 dark:text-white/50 group-hover:text-black/80 dark:group-hover:text-white/80 mb-2 transition-colors" />
                    <h4 className="text-sm font-medium text-black dark:text-white mb-1">
                      {option.title}
                    </h4>
                    <p className="text-xs text-black/40 dark:text-white/40">{option.pricing}</p>
                  </button>
                );
              })}
            </motion.div>
          )}

          {state.step === "select-date" && (
            <motion.div
              key="select-date"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center">
                {selectedOption && (
                  <p className="text-sm text-black/50 dark:text-white/50 mb-6">
                    Scheduling: <span className="text-black/80 dark:text-white/80">{selectedOption.title}</span>
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

          {state.step === "select-time" && (
            <motion.div
              key="select-time"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center">
                {state.selectedDate && (
                  <p className="text-sm text-black/50 dark:text-white/50 mb-6">
                    Date:{" "}
                    <span className="text-black/80 dark:text-white/80">
                      {state.selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                )}
                <TimeSlotPicker
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
                <div className="rounded-lg border border-black/[0.08] dark:border-white/[0.08] p-4 text-left space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-black/40 dark:text-white/40">Service</span>
                    <span className="text-sm text-black dark:text-white">
                      {selectedOption?.title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-black/40 dark:text-white/40">Date</span>
                    <span className="text-sm text-black dark:text-white">
                      {state.selectedDate?.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-black/40 dark:text-white/40">Time</span>
                    <span className="text-sm text-black dark:text-white">
                      {state.selectedTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-black/40 dark:text-white/40">Price</span>
                    <span className="text-sm text-black dark:text-white">
                      {selectedOption?.pricing}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => dispatch({ type: "CONFIRM" })}
                className="bg-black text-white dark:bg-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 rounded-md px-8 py-2.5 font-medium transition-colors w-full"
              >
                Confirm Booking
              </button>
            </motion.div>
          )}

          {state.step === "success" && (
            <motion.div
              key="success"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="text-center py-8"
            >
              <div className="w-12 h-12 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-black dark:text-white" />
              </div>
              <h4 className="text-lg font-semibold text-black dark:text-white mb-2">
                You&apos;re all set!
              </h4>
              <p className="text-sm text-black/40 dark:text-white/40 mb-6">
                A confirmation email will be sent to you shortly.
              </p>
              <button
                onClick={() => dispatch({ type: "RESET" })}
                className="border border-black/[0.15] dark:border-white/[0.15] text-black/60 dark:text-white/60 hover:border-black/30 dark:hover:border-white/30 hover:text-black dark:hover:text-white rounded-md px-5 py-2.5 text-sm transition-colors"
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
