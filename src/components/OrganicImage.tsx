interface OrganicImageProps {
  src: string;
  alt: string;
  edgeStyle?: 1 | 2 | 3;
  aspectRatio?: string;
  className?: string;
}

export const OrganicImage = ({
  src,
  alt,
  edgeStyle = 1,
  aspectRatio = 'aspect-video',
  className = ''
}: OrganicImageProps) => {
  const edgeClass = `organic-edge-${edgeStyle}`;

  return (
    <div className={`${aspectRatio} overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${edgeClass}`}
      />
    </div>
  );
};
