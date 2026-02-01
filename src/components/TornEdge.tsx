interface TornEdgeProps {
  color?: string;
  flip?: boolean;
}

export const TornEdge = ({ color = '#F5F1E8', flip = false }: TornEdgeProps) => {
  return (
    <div className={`w-full ${flip ? 'rotate-180' : ''}`} style={{ lineHeight: 0 }}>
      <svg width="100%" height="30" viewBox="0 0 1200 30" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,15 Q10,5 20,15 T40,15 T60,15 T80,15 T100,15 T120,15 T140,15 T160,15 T180,15 T200,15 T220,15 T240,15 T260,15 T280,15 T300,15 T320,15 T340,15 T360,15 T380,15 T400,15 T420,15 T440,15 T460,15 T480,15 T500,15 T520,15 T540,15 T560,15 T580,15 T600,15 T620,15 T640,15 T660,15 T680,15 T700,15 T720,15 T740,15 T760,15 T780,15 T800,15 T820,15 T840,15 T860,15 T880,15 T900,15 T920,15 T940,15 T960,15 T980,15 T1000,15 T1020,15 T1040,15 T1060,15 T1080,15 T1100,15 T1120,15 T1140,15 T1160,15 T1180,15 T1200,15 L1200,30 L0,30 Z"
          fill={color}
        />
      </svg>
    </div>
  );
};
