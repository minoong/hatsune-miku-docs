import type { FlipCardImageProps } from '~/features/flip-card/model/types';

export const FlipCardImage = ({ src, alt, className = '', objectFit = 'cover' }: FlipCardImageProps) => {
  const objectFitClass = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  }[objectFit];

  return (
    <div className={`absolute top-0 left-0 h-full w-full ${className}`}>
      <img src={src} alt={alt} className={`absolute top-0 left-0 h-full w-full ${objectFitClass}`} />
    </div>
  );
};
