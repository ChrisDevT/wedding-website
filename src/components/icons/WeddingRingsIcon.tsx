interface IconProps {
  className?: string;
}

export const WeddingRingsIcon = ({ className = "" }: IconProps) => {
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
      <circle cx="38" cy="55" r="20" />
      <circle cx="62" cy="55" r="20" />
      <path d="M 45 28 C 45 28, 48 22, 50 22 C 52 22, 55 28, 55 28 C 55 28, 52 35, 50 35 C 48 35, 45 28, 45 28 Z" />
    </svg>
  );
};
