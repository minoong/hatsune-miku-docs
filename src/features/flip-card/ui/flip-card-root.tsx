import type { FlipCardProps } from '~/features/flip-card/model/types';

export const FlipCardRoot = ({ children, className = '' }: FlipCardProps) => {
  return (
    <div className={`group relative m-5 h-80 w-80 [perspective:1000px] [transform-style:preserve-3d] ${className}`}>
      <div className="absolute top-0 left-0 h-full w-full transition-transform duration-1000 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {children}
      </div>
    </div>
  );
};
