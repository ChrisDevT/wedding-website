interface EditorialLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const EditorialLabel = ({ children, className = '' }: EditorialLabelProps) => {
  return (
    <div className={`editorial-label text-bronze ${className}`}>
      {children}
    </div>
  );
};
