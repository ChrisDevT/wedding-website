interface IconProps {
  className?: string;
}

export const WeddingCarIcon = ({ className = "" }: IconProps) => {
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
      <path d="M 20 55 L 20 50 C 20 45, 25 42, 30 40 L 40 35 C 42 34, 58 34, 60 35 L 70 40 C 75 42, 80 45, 80 50 L 80 55" />
      <rect x="20" y="55" width="60" height="15" rx="2" />
      <circle cx="30" cy="72" r="6" />
      <circle cx="70" cy="72" r="6" />
      <line x1="35" y1="45" x2="35" y2="55" />
      <line x1="65" y1="45" x2="65" y2="55" />
      <path d="M 45 45 C 45 45, 47 40, 50 40 C 53 40, 55 45, 55 45 C 55 45, 53 48, 50 48 C 47 48, 45 45, 45 45 Z" />
      <path d="M 48 22 C 48 22, 49 18, 50 18 C 51 18, 52 22, 52 22 C 52 22, 51 25, 50 25 C 49 25, 48 22, 48 22 Z" />
    </svg>
  );
};
