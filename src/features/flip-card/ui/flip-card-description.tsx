import type { FlipCardDescriptionProps } from '~/features/flip-card/model/types';

export const FlipCardDescription = ({ children, className = '' }: FlipCardDescriptionProps) => {
  return <p className={`text-base text-white ${className}`}>{children}</p>;
};
