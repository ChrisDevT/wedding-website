interface IconProps {
  className?: string;
}

export const MicrophoneIcon = ({ className = "" }: IconProps) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="35" y="15" width="15" height="30" rx="7" />
      <path d="M 28 40 C 28 48, 35 55, 42.5 55 C 50 55, 57 48, 57 40" />
      <line x1="42.5" y1="55" x2="42.5" y2="68" />
      <line x1="35" y1="68" x2="50" y2="68" />
      <path d="M 48 70 C 50 72, 55 75, 60 78 C 65 81, 70 80, 72 78" />
      <ellipse cx="72" cy="78" rx="8" ry="5" transform="rotate(-25 72 78)" />
    </svg>
  );
};
