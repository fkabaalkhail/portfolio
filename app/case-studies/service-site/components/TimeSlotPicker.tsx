"use client";

import { cn } from "@/lib/utils";

interface TimeSlotPickerProps {
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

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

// Deterministically mark some slots as unavailable (simulated)
const unavailableSlots = new Set(["12:00 PM", "3:00 PM"]);

export default function TimeSlotPicker({
  selectedTime,
  onSelectTime,
}: TimeSlotPickerProps) {
  return (
    <div className="w-full max-w-sm mx-auto">
      <p className="text-sm text-white/50 mb-4 text-center">
        Select an available time slot
      </p>
      <div className="grid grid-cols-2 gap-2">
        {timeSlots.map((time) => {
          const isUnavailable = unavailableSlots.has(time);
          const isSelected = selectedTime === time;

          return (
            <button
              key={time}
              onClick={() => onSelectTime(time)}
              disabled={isUnavailable}
              className={cn(
                "px-4 py-3 rounded-md text-sm font-medium transition-colors",
                isSelected
                  ? "bg-white text-black"
                  : isUnavailable
                    ? "border border-white/[0.06] text-white/20 cursor-not-allowed line-through"
                    : "border border-white/[0.08] text-white/60 hover:border-white/[0.15] hover:text-white"
              )}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
}
