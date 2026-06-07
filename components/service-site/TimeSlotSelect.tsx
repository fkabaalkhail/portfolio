"use client";

interface TimeSlotSelectProps {
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

export default function TimeSlotSelect({
  selectedTime,
  onSelectTime,
}: TimeSlotSelectProps) {
  return (
    <div className="w-full max-w-sm mx-auto">
      <p className="text-sm text-white/50 mb-4 text-center">
        Select an available time slot
      </p>
      <div className="grid grid-cols-2 gap-2">
        {timeSlots.map((time) => (
          <button
            key={time}
            onClick={() => onSelectTime(time)}
            className={`
              px-4 py-3 rounded-md text-sm font-medium transition-colors
              ${
                selectedTime === time
                  ? "bg-white text-black"
                  : "border border-white/[0.08] text-white/60 hover:border-white/20 hover:text-white"
              }
            `}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}
