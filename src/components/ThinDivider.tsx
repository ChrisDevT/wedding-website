interface ThinDividerProps {
  className?: string;
  vertical?: boolean;
}

export const ThinDivider = ({ className = '', vertical = false }: ThinDividerProps) => {
  if (vertical) {
    return <div className={`thin-divider w-px h-full ${className}`} />;
  }
  return <div className={`thin-divider w-full ${className}`} />;
};
