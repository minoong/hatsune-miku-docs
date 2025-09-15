import type { FlipCardTitleProps } from '~/features/flip-card/model/types';

export const FlipCardTitle = ({ children, className = '' }: FlipCardTitleProps) => {
  return <h2 className={`text-white text-xl tracking-wider ${className}`}>{children}</h2>;
};
