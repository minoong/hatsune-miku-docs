import type { FlipCardContentProps } from '~/features/flip-card/model/types';

export const FlipCardContent = ({ children, className = '' }: FlipCardContentProps) => {
  return (
    <div
      className={`absolute top-0 left-0 w-full h-full [backface-visibility:hidden] flex justify-center items-center [transform-style:preserve-3d] [transform:rotateY(180deg)] ${className}`}
    >
      <div className="[transform-style:preserve-3d] p-5 [transform:translateZ(100px)]">{children}</div>
    </div>
  );
};
