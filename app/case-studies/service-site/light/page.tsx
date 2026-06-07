"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cloud,
  Globe,
  Smartphone,
  Bot,
  Phone,
  Zap,
  Mail,
  MapPin,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import Link from "next/link";

/* ─── Data ─────────────────────────────────────────────────────────────── */

const services = [
  {
    id: "cloud",
    title: "Cloud & DevOps",
    desc: "Infrastructure, Kubernetes, CI/CD, cloud migrations",
    icon: Cloud,
    price: "From $150/hr",
  },
  {
    id: "web",
    title: "Web Development",
    desc: "React, Next.js, Node.js applications",
    icon: Globe,
    price: "From $120/hr",
  },
  {
    id: "ios",
    title: "iOS Development",
    desc: "Swift, SwiftUI native apps",
    icon: Smartphone,
    price: "From $140/hr",
  },
  {
    id: "ai",
    title: "AI & Automation",
    desc: "Chatbots, data pipelines, intelligent workflows",
    icon: Bot,
    price: "From $160/hr",
  },
];

const bookingOptions = [
  {
    id: "discovery",
    title: "Discovery Call",
    desc: "Free 30-min intro call",
    icon: Phone,
    price: "Free",
    duration: "30 min",
  },
  {
    id: "sprint",
    title: "Sprint Session",
    desc: "2-hour focused session",
    icon: Zap,
    price: "$200",
    duration: "2 hours",
  },
];

const allBookingOptions = [...services, ...bookingOptions];

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

const unavailableSlots = new Set(["12:00 PM", "3:00 PM"]);

/* ─── Calendar Component ───────────────────────────────────────────────── */

function CalendarPicker({
  selectedDate,
  onSelectDate,
}: {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    return new Date(year, month + 1, 0).getDate();
  }, [currentMonth]);

  const firstDayOfWeek = useMemo(() => {
    return currentMonth.getDay();
  }, [currentMonth]);

  const prevMonthDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const days: number[] = [];
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(prevMonthLastDay - i);
    }
    return days;
  }, [currentMonth, firstDayOfWeek]);

  const nextMonthDays = useMemo(() => {
    const totalCells = 42;
    const filledCells = firstDayOfWeek + daysInMonth;
    const remaining = totalCells - filledCells;
    return Array.from({ length: remaining }, (_, i) => i + 1);
  }, [firstDayOfWeek, daysInMonth]);

  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const isDisabled = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return date < today || date.getDay() === 0 || date.getDay() === 6;
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isPrevDisabled = () => {
    const now = new Date();
    return (
      currentMonth.getFullYear() === now.getFullYear() &&
      currentMonth.getMonth() === now.getMonth()
    );
  };

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          disabled={isPrevDisabled()}
          className="p-2 text-stone-500 hover:text-stone-900 disabled:text-stone-300 disabled:cursor-not-allowed transition-colors rounded-lg hover:bg-stone-100"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-semibold text-stone-900">
          {monthName}
        </span>
        <button
          onClick={nextMonth}
          className="p-2 text-stone-500 hover:text-stone-900 transition-colors rounded-lg hover:bg-stone-100"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {weekdays.map((day) => (
          <div
            key={day}
            className="text-center text-xs text-stone-400 font-medium py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {prevMonthDays.map((day) => (
          <div
            key={`prev-${day}`}
            className="aspect-square flex items-center justify-center rounded-full text-sm text-stone-200"
          >
            {day}
          </div>
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const disabled = isDisabled(day);
          const selected = isSelected(day);

          return (
            <button
              key={day}
              disabled={disabled}
              onClick={() => {
                const date = new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth(),
                  day
                );
                onSelectDate(date);
              }}
              className={[
                "aspect-square flex items-center justify-center rounded-full text-sm transition-all",
                selected
                  ? "bg-indigo-600 text-white font-semibold shadow-md"
                  : disabled
                    ? "text-stone-300 cursor-not-allowed"
                    : "text-stone-700 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer",
              ].join(" ")}
              aria-label={`${monthName} ${day}`}
            >
              {day}
            </button>
          );
        })}

        {nextMonthDays.map((day) => (
          <div
            key={`next-${day}`}
            className="aspect-square flex items-center justify-center rounded-full text-sm text-stone-200"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Time Slot Picker ─────────────────────────────────────────────────── */

function TimeSlotPicker({
  selectedTime,
  onSelectTime,
}: {
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}) {
  return (
    <div className="w-full max-w-sm mx-auto">
      <p className="text-sm text-stone-500 mb-4 text-center">
        Select an available time slot
      </p>
      <div className="grid grid-cols-2 gap-3">
        {timeSlots.map((time) => {
          const isUnavailable = unavailableSlots.has(time);
          const isSelected = selectedTime === time;

          return (
            <button
              key={time}
              onClick={() => onSelectTime(time)}
              disabled={isUnavailable}
              className={[
                "px-4 py-3 rounded-xl text-sm font-medium transition-all",
                isSelected
                  ? "bg-indigo-600 text-white shadow-md"
                  : isUnavailable
                    ? "bg-stone-100 text-stone-300 cursor-not-allowed line-through"
                    : "bg-white border-2 border-stone-200 text-stone-700 hover:border-indigo-300 hover:text-indigo-700",
              ].join(" ")}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Main Page Component ──────────────────────────────────────────────── */

type BookingStep = "select" | "date" | "time" | "confirm" | "done";

export default function LightServiceSite() {
  const [step, setStep] = useState<BookingStep>("select");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const selectedOption = allBookingOptions.find(
    (o) => o.id === selectedService
  );

  const handleSelectService = (id: string) => {
    setSelectedService(id);
    setStep("date");
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setStep("time");
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    setStep("confirm");
  };

  const handleConfirm = () => {
    setStep("done");
  };

  const handleReset = () => {
    setStep("select");
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleBack = () => {
    if (step === "date") setStep("select");
    if (step === "time") setStep("date");
    if (step === "confirm") setStep("time");
  };

  const stepNumber = () => {
    switch (step) {
      case "select":
        return 1;
      case "date":
        return 2;
      case "time":
        return 3;
      case "confirm":
        return 4;
      default:
        return 0;
    }
  };

  const stepTitle = () => {
    switch (step) {
      case "select":
        return "Choose a Service";
      case "date":
        return "Pick a Date";
      case "time":
        return "Pick a Time";
      case "confirm":
        return "Confirm Booking";
      case "done":
        return "Booking Confirmed";
    }
  };

  const stepVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ── Back Link ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto px-6 pt-8"
      >
        <Link
          href="/#case-studies"
          className="inline-flex items-center gap-2 rounded-full border-2 border-stone-200 px-4 py-2 text-sm text-stone-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>
      </motion.div>

      {/* ── Hero Section ───────────────────────────────────────────────── */}
      <section className="py-20 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Available for new projects
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 mb-6 tracking-tight">
            Fahad Dev Studio
          </h1>
          <p className="text-lg sm:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed mb-10">
            Full-stack development, cloud architecture, and AI solutions.
            Let&apos;s build something great together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#booking"
              className="bg-indigo-600 text-white rounded-full px-8 py-3.5 font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Book a Session
            </a>
            <a
              href="#services"
              className="border-2 border-stone-200 text-stone-700 rounded-full px-8 py-3.5 font-medium hover:border-indigo-300 hover:text-indigo-600 transition-colors"
            >
              View Services
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── Services Section ───────────────────────────────────────────── */}
      <section id="services" className="py-20 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            Services
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            Specialized expertise across the full technology stack
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-5 group-hover:bg-indigo-100 transition-colors">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-stone-500 mb-4 leading-relaxed">
                  {service.desc}
                </p>
                <span className="text-sm font-semibold text-indigo-600">
                  {service.price}
                </span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Booking Section ────────────────────────────────────────────── */}
      <section id="booking" className="py-20 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            Book a Session
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            Schedule time with me in a few simple steps
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 max-w-2xl mx-auto">
          {/* Step header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              {step !== "select" && step !== "done" && (
                <button
                  onClick={handleBack}
                  className="p-2 text-stone-400 hover:text-stone-700 transition-colors rounded-lg hover:bg-stone-100"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <h3 className="text-lg font-bold text-stone-900">
                {stepTitle()}
              </h3>
            </div>
            {step !== "done" && step !== "select" && (
              <span className="text-xs font-medium text-stone-400 bg-stone-100 px-3 py-1 rounded-full">
                Step {stepNumber()} of 4
              </span>
            )}
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            {step === "select" && (
              <motion.div
                key="select"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {allBookingOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectService(option.id)}
                      className="text-left p-5 rounded-xl border-2 border-stone-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition-colors">
                        <Icon className="w-5 h-5 text-stone-500 group-hover:text-indigo-600 transition-colors" />
                      </div>
                      <h4 className="text-sm font-semibold text-stone-900 mb-1">
                        {option.title}
                      </h4>
                      <p className="text-xs text-stone-400">{option.price}</p>
                    </button>
                  );
                })}
              </motion.div>
            )}

            {step === "date" && (
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
                    <p className="text-sm text-stone-500 mb-6">
                      Scheduling:{" "}
                      <span className="font-semibold text-stone-800">
                        {selectedOption.title}
                      </span>
                    </p>
                  )}
                  <CalendarPicker
                    selectedDate={selectedDate}
                    onSelectDate={handleSelectDate}
                  />
                </div>
              </motion.div>
            )}

            {step === "time" && (
              <motion.div
                key="time"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col items-center">
                  {selectedDate && (
                    <p className="text-sm text-stone-500 mb-6">
                      Date:{" "}
                      <span className="font-semibold text-stone-800">
                        {selectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </p>
                  )}
                  <TimeSlotPicker
                    selectedTime={selectedTime}
                    onSelectTime={handleSelectTime}
                  />
                </div>
              </motion.div>
            )}

            {step === "confirm" && (
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
                  <div className="rounded-xl bg-stone-50 p-5 text-left space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-stone-400">Service</span>
                      <span className="text-sm font-medium text-stone-900">
                        {selectedOption?.title}
                      </span>
                    </div>
                    <div className="border-t border-stone-100" />
                    <div className="flex justify-between">
                      <span className="text-sm text-stone-400">Date</span>
                      <span className="text-sm font-medium text-stone-900">
                        {selectedDate?.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="border-t border-stone-100" />
                    <div className="flex justify-between">
                      <span className="text-sm text-stone-400">Time</span>
                      <span className="text-sm font-medium text-stone-900">
                        {selectedTime}
                      </span>
                    </div>
                    <div className="border-t border-stone-100" />
                    <div className="flex justify-between">
                      <span className="text-sm text-stone-400">Price</span>
                      <span className="text-sm font-medium text-indigo-600">
                        {selectedOption?.price}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleConfirm}
                  className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-full px-8 py-3 font-medium transition-colors w-full shadow-lg shadow-indigo-200"
                >
                  Confirm Booking
                </button>
              </motion.div>
            )}

            {step === "done" && (
              <motion.div
                key="done"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="text-center py-8"
              >
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                  <Check className="w-7 h-7 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-stone-900 mb-2">
                  You&apos;re all set!
                </h4>
                <p className="text-sm text-stone-500 mb-8">
                  A confirmation email will be sent to you shortly.
                </p>
                <button
                  onClick={handleReset}
                  className="border-2 border-stone-200 text-stone-700 hover:border-indigo-300 hover:text-indigo-600 rounded-full px-6 py-2.5 text-sm font-medium transition-colors"
                >
                  Book Another Session
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Contact Section ────────────────────────────────────────────── */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            Have a project in mind? Let&apos;s talk.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-md p-6 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-sm font-semibold text-stone-900 mb-1">Email</h3>
            <p className="text-sm text-stone-500">fahad@devstudio.com</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-md p-6 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
              <Phone className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-sm font-semibold text-stone-900 mb-1">Phone</h3>
            <p className="text-sm text-stone-500">+1 (613) 555-0199</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-md p-6 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-sm font-semibold text-stone-900 mb-1">
              Location
            </h3>
            <p className="text-sm text-stone-500">Ottawa, Canada</p>
          </motion.div>
        </div>
      </section>

      {/* ── Footer / Attribution ───────────────────────────────────────── */}
      <footer className="py-10 border-t border-stone-200 text-center">
        <p className="text-sm text-stone-900 font-medium">
          Designed by Fahad Aba-Alkhail
        </p>
        <p className="text-xs text-stone-400 mt-2">
          This is the light-themed alternative design (Storyboard 2)
        </p>
      </footer>
    </div>
  );
}
