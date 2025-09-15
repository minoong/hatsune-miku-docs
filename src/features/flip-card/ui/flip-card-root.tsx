import type { FlipCardProps } from '~/features/flip-card/model/types';

export const FlipCardRoot = ({ children, className = '' }: FlipCardProps) => {
  return (
    <div className={`group relative w-80 h-80 m-5 [transform-style:preserve-3d] [perspective:1000px] ${className}`}>
      <div className="absolute top-0 left-0 w-full h-full [transform-style:preserve-3d] transition-transform duration-1000 ease-in-out group-hover:[transform:rotateY(180deg)]">
        {children}
      </div>
    </div>
  );
};
