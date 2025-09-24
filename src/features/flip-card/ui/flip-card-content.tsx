import type { FlipCardContentProps } from '~/features/flip-card/model/types';

export const FlipCardContent = ({ children, className = '' }: FlipCardContentProps) => {
  return (
    <div
      className={`absolute top-0 left-0 flex h-full w-full [transform:rotateY(180deg)] items-center justify-center [backface-visibility:hidden] [transform-style:preserve-3d] ${className}`}
    >
      <div className="[transform:translateZ(100px)] p-5 [transform-style:preserve-3d]">{children}</div>
    </div>
  );
};
