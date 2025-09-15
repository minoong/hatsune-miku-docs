interface FlipCardGridProps {
  children: React.ReactNode;
  className?: string;
}

export const FlipCardGrid = ({ children, className = '' }: FlipCardGridProps) => {
  return (
    <section className={`flex justify-center items-center flex-wrap [transform-style:preserve-3d] max-w-[1100px] mx-auto ${className}`}>{children}</section>
  );
};
