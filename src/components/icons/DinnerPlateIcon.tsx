interface IconProps {
  className?: string;
}

export const DinnerPlateIcon = ({ className = "" }: IconProps) => {
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
      <circle cx="50" cy="50" r="22" />
      <circle cx="50" cy="50" r="18" />
      <line x1="20" y1="20" x2="20" y2="50" />
      <line x1="16" y1="20" x2="16" y2="45" />
      <line x1="24" y1="20" x2="24" y2="45" />
      <path d="M 16 45 C 16 48, 18 50, 20 50 C 22 50, 24 48, 24 45" />
      <line x1="80" y1="20" x2="80" y2="50" />
      <path d="M 75 20 L 75 35 C 75 38, 77 40, 80 40" />
      <path d="M 72 15 C 72 15, 75 12, 78 12 C 78 15, 75 18, 72 18 C 72 18, 72 15, 72 15" />
    </svg>
  );
};
