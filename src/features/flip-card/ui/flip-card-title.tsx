import type { FlipCardTitleProps } from '~/features/flip-card/model/types';

export const FlipCardTitle = ({ children, className = '' }: FlipCardTitleProps) => {
  return <h2 className={`text-xl tracking-wider text-white ${className}`}>{children}</h2>;
};
