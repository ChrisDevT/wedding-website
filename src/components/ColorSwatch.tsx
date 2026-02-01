interface ColorSwatchProps {
  color: string;
  name: string;
  hex?: string;
}

export const ColorSwatch = ({ color, name, hex }: ColorSwatchProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="w-20 h-20 rounded-full shadow-md"
        style={{
          backgroundColor: color,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      />
      <div className="text-center">
        <p className="text-xs font-serif text-dark-brown">{name}</p>
        {hex && (
          <p className="text-[9px] font-mono text-bronze mt-1">{hex}</p>
        )}
      </div>
    </div>
  );
};
