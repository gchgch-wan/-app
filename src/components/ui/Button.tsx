import { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({ variant = 'primary', size = 'md', className, children, ...props }: Props) {
  return (
    <button
      className={cn(
        'rounded-xl font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2',
        variant === 'primary' && 'glow-btn',
        variant === 'outline' && 'border border-[#1a1a3e] hover:border-[#00f0ff] hover:text-[#00f0ff] bg-transparent',
        variant === 'ghost' && 'hover:bg-[#1a1a3e] text-gray-400 hover:text-white',
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-5 py-2.5',
        size === 'lg' && 'px-8 py-4 text-lg',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
