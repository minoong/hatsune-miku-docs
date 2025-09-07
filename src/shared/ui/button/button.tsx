import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: ReactNode;
}

const buttonVariants = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button = ({ variant = 'primary', size = 'md', fullWidth = false, className = '', children, disabled, ...props }: ButtonProps) => {
  const baseClasses =
    'font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantClasses = buttonVariants[variant];
  const sizeClasses = buttonSizes[size];
  const widthClasses = fullWidth ? 'w-full' : '';

  return (
    <button className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClasses} ${className}`} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
