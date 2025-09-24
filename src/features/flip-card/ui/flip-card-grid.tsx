interface FlipCardGridProps {
  children: React.ReactNode;
  className?: string;
}

export const FlipCardGrid = ({ children, className = '' }: FlipCardGridProps) => {
  return (
    <section className={`mx-auto flex max-w-[1100px] flex-wrap items-center justify-center [transform-style:preserve-3d] ${className}`}>{children}</section>
  );
};
