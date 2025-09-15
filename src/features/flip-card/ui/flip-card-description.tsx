import type { FlipCardDescriptionProps } from '~/features/flip-card/model/types';

export const FlipCardDescription = ({ children, className = '' }: FlipCardDescriptionProps) => {
  return <p className={`text-white text-base ${className}`}>{children}</p>;
};
