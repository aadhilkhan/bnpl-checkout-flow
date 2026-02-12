export default function AnimatedCheckmark() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Pulse ring */}
      <div className="absolute w-24 h-24 rounded-full bg-green-200 animate-pulse-ring" />

      {/* Circle */}
      <svg
        className="w-24 h-24 animate-checkmark-circle"
        viewBox="0 0 96 96"
        fill="none"
      >
        <circle cx="48" cy="48" r="46" fill="#22c55e" />
        {/* Checkmark */}
        <path
          className="animate-checkmark-draw"
          d="M28 50 L42 64 L68 34"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
