interface IconProps {
  className?: string;
}

export const ChampagneGlassesIcon = ({ className = "" }: IconProps) => {
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
      <path d="M 30 25 L 25 50 L 27 50 L 27 70 L 23 70 L 31 70 M 30 25 L 35 25" />
      <path d="M 70 25 L 75 50 L 73 50 L 73 70 L 77 70 L 69 70 M 70 25 L 65 25" />
      <path d="M 42 18 C 42 18, 45 12, 50 12 C 55 12, 58 18, 58 18" />
      <path d="M 42 18 L 42 24 L 50 28 L 58 24 L 58 18" />
      <path d="M 46 24 L 44 28 M 54 24 L 56 28" />
    </svg>
  );
};
