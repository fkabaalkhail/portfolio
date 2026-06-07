"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarPickerProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export default function CalendarPicker({
  selectedDate,
  onSelectDate,
}: CalendarPickerProps) {
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

  // Calculate previous month trailing days
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

  // Calculate next month leading days to fill 42 cells
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
    // Disable past dates and weekends
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
          className="p-2 text-white/60 hover:text-white disabled:text-white/20 disabled:cursor-not-allowed transition-colors rounded-md hover:bg-white/5"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-medium text-white">{monthName}</span>
        <button
          onClick={nextMonth}
          className="p-2 text-white/60 hover:text-white transition-colors rounded-md hover:bg-white/5"
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {weekdays.map((day) => (
          <div
            key={day}
            className="text-center text-xs text-white/40 font-medium py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days grid - 42 cells (6 rows × 7 columns) */}
      <div className="grid grid-cols-7 gap-1">
        {/* Previous month trailing days */}
        {prevMonthDays.map((day) => (
          <div
            key={`prev-${day}`}
            className="aspect-square flex items-center justify-center rounded-md text-sm text-white/10"
          >
            {day}
          </div>
        ))}

        {/* Current month days */}
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
              className={cn(
                "aspect-square flex items-center justify-center rounded-md text-sm transition-colors",
                selected
                  ? "bg-white text-black font-medium"
                  : disabled
                    ? "text-white/20 cursor-not-allowed"
                    : "text-white/70 hover:bg-white/10 hover:text-white cursor-pointer"
              )}
              aria-label={`${monthName} ${day}`}
            >
              {day}
            </button>
          );
        })}

        {/* Next month leading days */}
        {nextMonthDays.map((day) => (
          <div
            key={`next-${day}`}
            className="aspect-square flex items-center justify-center rounded-md text-sm text-white/10"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
