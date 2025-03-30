
export const CircularProgress = ({ percentage }: { percentage: number }) => {
  const radius = 50; // Circle radius
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius; // Full circle length
  const offset = circumference - (percentage / 100) * circumference; // Progress length

  return (
    <svg width="25" height="25" viewBox="0 0 120 120">
      {/* Background Circle */}
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke="#e0e0e0"
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Progress Circle */}
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke="blue"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 60 60)" // Rotates from top
      />
    </svg>
  );
};